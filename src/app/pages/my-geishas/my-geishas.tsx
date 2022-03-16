import React, {useEffect, useState} from "react";
import cn from "classnames";
import Pagination from '@material-ui/lab/Pagination';

import MarketCard from "../../component/market-card/market-card";
import { useOverlay } from "../../core/context-provider/loading-overlay/loading-overlay-context";
import {
    getMintedGeishas,
    getMyGeishasNoListed,
    getMyGeishasOnSale
} from "../../core/utils/network/catalog";

import { useWallet } from "../../core/context-provider/wallet/wallet-context";
import { Filter } from "../../core/models/filter";
import { Geisha } from "../../core/models/geisha";
import { lengthOfAddress } from "../../core/utils/wallet";

import "./catalog-page.scss";
import styles from "./Search01.module.sass";

export const countOnDisplay: number = 8;

const MyGeishas = () => {

    const navLinks = [ "No List", "On Sale", "Minted" ];
    const { setIsActivity, setOverlayText } = useOverlay();
    const { setPageIndex, walletAddress } = useWallet();
    const [activeIndex, setActiveIndex] = useState(0);

    const [filterData, setFilterData] = useState<Filter>({
        offset: 0,
        limit: countOnDisplay,
        walletAddress: walletAddress,
    });

    const [pageCount, setPageCount] = useState<number>(0);
    const [geishas, setGeishas] = useState<Geisha[]>([]);

    useEffect(() => {
        setIsActivity(true);
        setOverlayText('Loading...');
        setFilterData({...filterData, walletAddress: walletAddress});
        if(walletAddress.length !== lengthOfAddress) {
            getMyGeishas({...filterData, walletAddress: walletAddress}, activeIndex);
            return;
        }
        getMyGeishasNoListed({...filterData, walletAddress: walletAddress}).then((result: [Geisha[], number]) => {
            setIsActivity(false);
            if(!result || !result[0]) {
                return;
            }
            setGeishas([...result[0]]);
            setPageCount(parseInt(String(result[1] / countOnDisplay)) + 1);
        });
    }, [walletAddress]);

    useEffect(() => {
        setPageIndex(1);
    });

    const setDisplayGeishas = (geishasData: [Geisha[], number]) => {
        setIsActivity(false);
        if(!geishasData || !geishasData[0]) {
            return;
        }
        setGeishas([...geishasData[0]]);
        setPageCount(parseInt(String(geishasData[1] / countOnDisplay)) + 1);
    }

    const getMyGeishas = (filter: Filter, index: number) => {
        setIsActivity(true);
        switch (index) {
            case 0:
                getMyGeishasNoListed(filter).then(async (result: [Geisha[], number]) => {
                    setDisplayGeishas(result);
                });
                break;
            case 1:
                getMyGeishasOnSale(filter).then(async (result: [Geisha[], number]) => {
                    setDisplayGeishas(result);
                });
                break;
            case 2:
                getMintedGeishas(filter).then(async (result: [Geisha[], number]) => {
                    setDisplayGeishas(result);
                });
                break;
            default:
                getMyGeishasNoListed(filter).then(async (result: [Geisha[], number]) => {
                    setDisplayGeishas(result);
                });
                break;
        }
    }

  return (
  <div className={cn("min-vh-100")} style={{ paddingTop: '40px' }}>
      <div className="container">
          <div className={cn("d-flex flex-row justify-content-around")}>
              <div>
                  {navLinks.map((item, index) => (
                      <button
                          className={cn(styles.link, {
                              [styles.active]: index === activeIndex,
                          })}
                          key={index}
                          onClick={() => {
                              setActiveIndex(index);
                              setFilterData({ ...filterData, offset: 0 });
                              getMyGeishas({ ...filterData, offset: 0 }, index);
                          }}
                      >
                          {item}
                      </button>
                  ))}
              </div>
              <button
                  className={cn("btn", "btn-sm", 'border-radius-50', 'btn-outline-danger', styles.button)}
                  onClick={() => {
                      getMyGeishas(filterData, activeIndex);
                  }}
              >
                  Refresh
              </button>
          </div>
        <div className={cn(styles.row, "mt-20")}>
          <div className={styles.wrapper}>
            <div className={cn(styles.list)}>
              {
                  geishas.map((item: any, index: number) => (
                    <MarketCard className={styles.card} geisha={item} key={index} />
                  ))
              }
            </div>
              <div className="d-flex justify-content-center my-20">
                  {
                      pageCount > 1 && (
                          <Pagination count={ pageCount } page={filterData.offset / countOnDisplay + 1} variant="outlined" shape="rounded"
                                      onChange={(event, value) => {
                                          const offset = (value - 1) * countOnDisplay;
                                          setFilterData({...filterData, offset: offset});
                                          setOverlayText('Loading...');
                                          setIsActivity(true);
                                          switch (activeIndex) {
                                              case 0:
                                                  getMyGeishasNoListed({...filterData, offset: offset}).then(async (result: [Geisha[], number]) => {
                                                        setDisplayGeishas(result);
                                                  });
                                                break;
                                              case 1:
                                                  getMyGeishasOnSale({...filterData, offset: offset}).then(async (result: [Geisha[], number]) => {
                                                        setDisplayGeishas(result);
                                                  });
                                                  break;
                                              case 2:
                                                  getMintedGeishas({...filterData, offset: offset}).then(async (result: [Geisha[], number]) => {
                                                        setDisplayGeishas(result);
                                                  });
                                                  break;
                                              default:
                                                  getMyGeishasNoListed({...filterData, offset: offset}).then(async (result: [Geisha[], number]) => {
                                                        setDisplayGeishas(result);
                                                  });
                                                  break;
                                          }
                                      }}
                          />
                      )
                  }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGeishas;

import React, {useEffect, useState} from "react";
import cn from "classnames";
import { backgrounds, bodies, faces, hairs, accessories, auras } from "../../../app/core/data/basic-images";
import Pagination from '@material-ui/lab/Pagination';

import Icon from "../../layout/Icon";
import MarketCard from "../../component/market-card/market-card";
import {useOverlay} from "../../core/context-provider/loading-overlay/loading-overlay-context";
import {Geisha} from "../../core/models/geisha";
import {getMarketPlaceItems} from "../../core/utils/network/catalog";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import {Filter} from "../../core/models/filter";
import Dropdown from "../../component/dropdown/dropdown";

import styles from "./Search01.module.sass";
import "./catalog-page.scss";
import {getFloorPrice, getTradingVolume} from "../../core/utils/network/geisha";

export const countOnDisplay: number = 12;

const Marketplace = () => {

    const { setIsActivity, setOverlayText } = useOverlay();
    const { setPageIndex, walletAddress } = useWallet();

    const [geisha, setGeisha] = useState<Geisha>({
        background: '',
        body: '',
        face: '',
        hair: '',
        accessories: '',
        aura: '',
    });

    const dropDownDatas =
        [
            { key: 'background', data: backgrounds },
            { key: 'body', data: bodies },
            { key: 'face', data: faces },
            { key: 'hair', data: hairs },
            { key: 'accessories', data: accessories },
            { key: 'aura', data: auras },
        ];
    const [filterData, setFilterData] = useState<Filter>({
        walletAddress: '',
        geisha: geisha,
        offset: 0,
        limit: countOnDisplay,
    });

    const [tradingVolume, setTradingVolume] = useState<number>(0);
    const [floorPrice, setFloorPrice] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [geishas, setGeishas] = useState<Geisha[]>([]);

    useEffect(() => {
        let isSubscribed = true;
        getTradingVolume().then((result: any) => {
            if(isSubscribed) {
                setTradingVolume(Number(result));
            }
        });
        getFloorPrice().then((result: any) => {
            if(isSubscribed) {
                setFloorPrice(Number(result));
            }
        });
        return () => {
            isSubscribed = false;
        };
    },[])

    useEffect(() => {
        loadMarketGeishas();
    }, [walletAddress])

    useEffect(() => {
        setFilterData({ ...filterData, geisha: geisha });
    }, [geisha])

    const loadMarketGeishas = () => {
        setPageIndex(0);
        setIsActivity(true);
        setOverlayText('Loading...');
        getMarketPlaceItems(filterData).then((result: [Geisha[], number]) => {
            setIsActivity(false);
            if(!result || !result[0]) {
                return;
            }
            setGeishas([...result[0]]);
            if(parseInt(String(result[1] / countOnDisplay)) === 0){
                setPageCount(parseInt(String(result[1] / countOnDisplay)));
            } else if(parseInt(String(result[1] / countOnDisplay)) > 0) {
                setPageCount(parseInt(String(result[1] / countOnDisplay)) + 1);
            }
        });
    }

    const getObject = (key: string): string => {
        const keys = Object.keys(geisha);
        if (keys.indexOf(key) >= 0) {
            // @ts-ignore
            return geisha[key];
        }
        return '';
    }

  return (
    <div className={cn("min-vh-100")} style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <div className={cn("container")}>
        <div className={styles.row}>
          <div className={styles.filters}>
              <button
                  className={cn('btn', 'btn-lg', 'btn-outline-danger', 'mb-10', 'w-100')}
                  onClick={() => {
                      loadMarketGeishas();
                  }}
              >
                  Filter
              </button>
            <div className={styles.group}>
                <div className={styles.label}>ADDRESS</div>
                <input
                    className={cn(styles.input, "mb-10")}
                    type="text"
                    value={ filterData.walletAddress }
                    onChange={(e) => setFilterData({ ...filterData, walletAddress: e.target.value })}
                    name="ADDRESS"
                    placeholder="Search"
                    required
                />
                {
                    dropDownDatas.map((item, index: number) => (
                        <div className={styles.item} key={ index }>
                            <div className={styles.label}>{item.key}</div>
                            <Dropdown
                                className={styles.dropdown}
                                keyValue={item.key}
                                geisha={geisha}
                                value={getObject(item.key)}
                                setGeisha={setGeisha}
                                options={item.data}
                            />
                        </div>
                    ))
                }
            </div>
            <div className={styles.reset} onClick={() => {
                setGeisha(
                {
                        background: '',
                        body: '',
                        face: '',
                        hair: '',
                        accessories: '',
                        aura: '',
                    }
                );
                setFilterData({ ...filterData, geisha: {
                        background: '',
                        body: '',
                        face: '',
                        hair: '',
                        accessories: '',
                        aura: '',
                    } });
            }}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center text-center p-5">
                    <h4 className="d-flex align-items-center">Floor Price: {`${floorPrice}`}</h4>
                    <img
                        className={cn(styles.avatar)}
                        src="/images/content/avax.png"
                        alt="AVAX"
                    />
                </div>
                <div className="d-flex align-items-center text-center p-5">
                    <h4 className="d-flex align-items-center">Trading Volume: {`${tradingVolume}`}</h4>
                    <img
                        className={cn(styles.avatar)}
                        src="/images/content/avax.png"
                        alt="AVAX"
                    />
                </div>
            </div>
            <div className={cn(styles.list)}>
                {
                    geishas.map((x: any, index: number) => (
                        <MarketCard className={styles.card} geisha={x} key={index} />
                    ))
                }
            </div>
            <div className="d-flex justify-content-center my-20">
                {
                    pageCount > 1 && (
                        <Pagination count={ pageCount } variant="outlined" shape="rounded"
                            onChange={(event, value) => {
                                const offset = (value - 1) * countOnDisplay;
                                setFilterData({...filterData, offset: offset});
                                setOverlayText('Loading...');
                                setIsActivity(true);
                                getMarketPlaceItems({...filterData, offset: offset}).then(async (result: [Geisha[], number]) => {
                                    setOverlayText('Loading...');
                                    setIsActivity(false);
                                    if(!result) {
                                        return;
                                    }
                                    setGeishas([...result[0]]);
                                });
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

export default Marketplace;

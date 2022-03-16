import React, {useEffect, useState} from "react";
import cn from "classnames";

import {Canvas} from "../canvas";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import Modal from "../modal/modal";
import CloseSellModalContent from "../close-sell-modal-content/close-sell-modal-content";
import SellModalContent from "../sell-modal-content/sell-modal-content";
import BuyModalContent from "../buy-modal-content/buy-modal-content";

import styles from "./Card.module.sass";
import DetailModalContent from "../detail-modal-content/detail-modal-content";

interface MarketCardProps {
    className: any;
    geisha: any
}

const MarketCard = (props: MarketCardProps) => {

    const { className, geisha } = props;
    const [geishaData, setGeishaData] = useState<any>();
    const { walletAddress, connectWallet, provider } = useWallet();
    const [isSaleForMode, setIsSaleForMode] = useState<boolean>(false);
    const [isModalShow, setIsModalShow] = useState<boolean>(false);
    const [isDetailModalShow, setIsDetailModalShow] = useState<boolean>(false);

    useEffect(() => {
        if(isDetailModalShow && isModalShow) {
            setIsDetailModalShow(false);
        }
    }, [isDetailModalShow])

    useEffect(() => {
        if(geisha) {
            setGeishaData(geisha);
        }
    }, [geisha])

    useEffect(() => {
        if(geishaData) {
            setIsSaleForMode(geishaData?.isForSale);
        }
    }, [geishaData])

      return (
          <div className={cn(className, styles.card)} >
            <div className="p-12" onClick={() => {
                setIsDetailModalShow(true);
            }}>
                <Canvas geishaData={geishaData} className={cn("w-100 border-radius-10")}/>
                <div className={styles.body}>
                    <div className={styles.line}>
                        <div className={styles.title}># {geishaData?.tokenId}</div>
                        {
                            geishaData?.price > 0 && (
                                <div className="d-flex flex-row">
                                    <div className={cn(styles.title, "pr-10")}>Price: </div>
                                    <div className={styles.price}>{geishaData?.price} AVAX</div>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.status}>
                        <div className="h6">Transfers: {geishaData?.transfers}</div>
                    </div>
                    <div className={styles.foot}>
                        {
                            provider ? (
                                <>
                                    {
                                        walletAddress.toUpperCase() === geishaData?.currentOwner.toUpperCase() ? (
                                            <button className={cn("btn", 'btn-outline-danger', "w-100", styles.button)} onClick={() => {
                                                if(geishaData?.isMinted) {
                                                    setIsModalShow(true);
                                                }
                                            }}>
                                                {
                                                    geishaData?.isMinted && geishaData?.isForSale ? 'VIEW' : 'SELL'
                                                }
                                            </button>
                                        ) : (
                                            <button className={cn("btn", 'btn-outline-danger', "w-100", styles.button)} disabled={!isSaleForMode} onClick={() => {
                                                setIsModalShow(true);
                                            }}>
                                                <span>Buy</span>
                                            </button>
                                        )
                                    }
                                </>
                            ) : (
                                <button className={cn("btn", "btn-lg", 'btn-outline-danger', "w-100", styles.button)} disabled={!isSaleForMode} onClick={() => {
                                    connectWallet();
                                }}>
                                    <span>Connect Wallet</span>
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
            <Modal
              isDetail={false}
              visible={isModalShow}
              onClose={() => setIsModalShow(false)}
            >
              {
                  walletAddress.toUpperCase() === geishaData?.currentOwner.toUpperCase() ? (
                      geishaData?.isMinted && geishaData?.isForSale ? (
                          <CloseSellModalContent geishaData={geisha} onClose={() => setIsModalShow(false)} setGeishaData={setGeishaData}/>
                      ) : (
                          <SellModalContent geishaData={geisha} onClose={() => setIsModalShow(false)} setGeishaData={setGeishaData}/>
                      )
                  ) : (
                      <BuyModalContent geishaData={geisha} onClose={() => setIsModalShow(false)}/>
                  )
              }
            </Modal>
            <Modal
                isDetail={true}
                visible={isDetailModalShow}
                onClose={() => {
                    if(!isModalShow) {
                        setIsDetailModalShow(false);
                    }
                }}
            >
                <DetailModalContent geishaData={geisha} onClose={() => setIsDetailModalShow(false)}/>
            </Modal>
          </div>
      );
};

export default MarketCard;

import React, {useEffect, useState} from "react";
import { BigNumber } from 'bignumber.js';
import cn from "classnames";
import Web3 from 'web3';

import styles from "./Connect.module.sass";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import {avaxGeishaAbi, marketAbi} from "../../core/data/web3-abi-address/abi";
import {avaxGeishaAddress, marketAddress} from "../../core/data/web3-abi-address/address";
import {toast} from "../../core/utils/notification.util";
import {ethUnit} from "../../core/data/ether-unit";
import {Canvas} from "../canvas";
import {getMarket} from "../../core/utils/network/geisha";

interface CloseModalProps {
    geishaData: any
    onClose: () => void
    setGeishaData: (geisha: any) => void
}

const CloseSellModalContent = (props: CloseModalProps) => {

    const { geishaData, onClose, setGeishaData } = props;
    const { walletAddress, connectWallet, provider } = useWallet();
    const [price, setPrice] = useState<number>(0);
    const [marketId, setMarketId] = useState<number>(-1);

    const metaWeb3 = new Web3(provider);
    const marketContract = new metaWeb3.eth.Contract(marketAbi, marketAddress);

    useEffect(() => {
        let isSubscribed = true;
        setPrice(geishaData?.price);
        getMarket(avaxGeishaAddress, geishaData?.tokenId).then((result) => {
            if(result && isSubscribed) {
                setMarketId(result.marketId);
            }
        });
        return () => {
            isSubscribed = false
        }
    }, [geishaData])

  return (
    <div className={cn(styles.connect)}>
        <div className={cn(styles.card)}>
            <div className="d-flex flex-column">
                <div className="d-flex flex-center">
                    <h3 className="mt-10"># {geishaData?.tokenId}</h3>
                </div>
                <Canvas geishaData={geishaData} className="mt-20 w-100 border-radius-10"/>
                <div className="font-weight-normal mt-10">New price:</div>
                <input
                    className={styles.input}
                    type="number"
                    value={ price }
                    onChange={(e) => setPrice(Number(e.target.value))}
                    name="search"
                    placeholder="Search"
                    required
                />
                {
                    provider ? (
                        <div className="d-flex flex-row mt-10 justify-content-end">
                            <button
                                className={cn(styles.link, "p-5 border-1 border-radius-5", "btn", 'btn-outline-danger')}
                                onClick={() => {onClose()}}
                            >
                                CANCEL
                            </button>
                            <button
                                className={cn(styles.link, "ml-10", "p-5 border-1 border-radius-5 btn-outline-success")}
                                onClick={() => {
                                    if(geishaData?.price.toString() === price.toString()) {
                                        toast('warning', 'Please input new price value.');
                                        return;
                                    }
                                    const priceValue = Web3.utils.toWei(price.toString(), 'ether');
                                    if(provider) {
                                        marketContract.methods.updateItem(avaxGeishaAddress, marketId, true, priceValue).send({ from: walletAddress }).then((result: any) => {
                                            if(geishaData) {
                                                toast('success', 'success');
                                                setGeishaData({...geishaData, price: price});
                                            }
                                        });
                                    }
                                }}
                            >
                                UPDATE PRICE
                            </button>
                            <button
                                className={cn(styles.link, "ml-10", "p-5 border-1 border-radius-5 btn-outline-success")}
                                onClick={() => {
                                    if(provider) {
                                        const priceValue = Web3.utils.toWei(price.toString(), 'ether');
                                        marketContract.methods.updateItem(avaxGeishaAddress, marketId, false, priceValue).send({ from: walletAddress }).then((result: any) => {
                                            if(geishaData) {
                                                toast('success', 'success');
                                                setGeishaData({...geishaData, isForSale: false});
                                            }
                                        });
                                    }
                                }}
                            >
                                CANCEL SALE
                            </button>
                        </div>
                    ) : (
                        <button
                            className={cn("button", "mt-10", styles.button)}
                            onClick={() => connectWallet()}
                        >
                            Unlock Wallet
                        </button>
                    )
                }
            </div>
        </div>
    </div>
  );
};

export default CloseSellModalContent;

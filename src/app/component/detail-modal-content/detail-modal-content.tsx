import React, {useEffect, useState} from "react";
import { BigNumber } from 'bignumber.js';
import cn from "classnames";
import Web3 from 'web3';

import styles from "./Connect.module.sass";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import {avaxGeishaAbi} from "../../core/data/web3-abi-address/abi";
import {avaxGeishaAddress} from "../../core/data/web3-abi-address/address";
import {toast} from "../../core/utils/notification.util";
import {ethUnit} from "../../core/data/ether-unit";
import {Canvas} from "../canvas";
import {environment} from "../../../environment";

interface SellModalProps {
    geishaData: any
    onClose: () => void
}

const DetailModalContent = (props: SellModalProps) => {

    const { geishaData, onClose } = props;
    const { walletAddress, connectWallet, provider } = useWallet();
    const [price, setPrice] = useState<number>(0);

    const metaWeb3 = new Web3(provider);
    const avaxGeishaContract = new metaWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);

    useEffect(() => {
        setPrice(geishaData?.price);
    }, [geishaData])

    return (
        <div className={cn(styles.connect)}>
            <div className="d-flex flex-column flex-lg-row">
                <div className="d-flex flex-column">
                    <a className={cn(styles.card, "mt-20 w-100 border-radius-10")} href={`${environment.serverUrl}/geisha/geisha-img/${geishaData?.id}`} target="_blank">
                        <Canvas geishaData={geishaData} className="w-100 border-radius-10"/>
                    </a>
                </div>
                <div className="d-flex flex-column w-100 justify-content-around align-items-lg-center">
                    <div className="d-flex justify-content-start width-280">
                        <h3 className="mt-10"># {geishaData?.tokenId}</h3>
                    </div>
                    <div className="d-flex justify-content-start">
                        <h5 className="text-bold width-120">BACKGROUND</h5>
                        <div className="font-italic width-160">{`: ${geishaData.background.toUpperCase()}`}</div>
                    </div>
                    <div className="d-flex justify-content-start">
                        <h5 className="text-bold width-120">BODY</h5>
                        <div className="font-italic width-160">{`: ${geishaData.body.toUpperCase()}`}</div>
                    </div>
                    <div className="d-flex justify-content-start">
                        <h5 className="text-bold width-120">FACE</h5>
                        <div className="font-italic width-160">{`: ${geishaData.face.toUpperCase()}`}</div>
                    </div>
                    <div className="d-flex justify-content-start">
                        <h5 className="text-bold width-120">HAIR</h5>
                        <div className="font-italic width-160">{`: ${geishaData.hair.toUpperCase()}`}</div>
                    </div>
                    <div className="d-flex justify-content-start">
                        <h5 className="text-bold width-120">ACCESSORIES</h5>
                        <div className="font-italic width-160">{`: ${geishaData.accessories.toUpperCase()}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModalContent;

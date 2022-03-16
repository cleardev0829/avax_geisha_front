import React, {useEffect, useState} from "react";
import { BigNumber } from 'bignumber.js';
import cn from "classnames";
import Web3 from 'web3';

import styles from "./Connect.module.sass";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import {avaxGeishaAbi} from "../../core/data/web3-abi-address/abi";
import {avaxGeishaAddress} from "../../core/data/web3-abi-address/address";
import {useOverlay} from "../../core/context-provider/loading-overlay/loading-overlay-context";
import {toast} from "../../core/utils/notification.util";
import {getMintedCount} from "../../core/utils/network/geisha";
import {ethUnit} from "../../core/data/ether-unit";
import {environment} from "../../../environment";

const PoolModalContent = () => {

    const { walletAddress, connectWallet, provider } = useWallet();

    const { setIsActivity, setOverlayText } = useOverlay();

    const [mintedAmount, setMintedAmount] = useState<number>(0);
    const [poolAmount, setPoolAmount] = useState<number>(0);
    const [primaryPrice, setPrimaryPrice] = useState<BigNumber>(new BigNumber(0));
    const [ownerAddress, setOwnerAddress] = useState<string>('');
    const [balanceOfUser, setBalanceOfUser] = useState<BigNumber>(new BigNumber(0));

    const httpWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rpcUrl));

    const metaWeb3 = new Web3(provider);
    const nftContract = new metaWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);

    useEffect(() => {
        getPrimaryData().then();
        metaWeb3.eth.getBalance(walletAddress).then((balance) => {
            const value = new BigNumber(balance).dividedBy(ethUnit).toFixed(4);
            setBalanceOfUser(new BigNumber(value));
        });
    },[])

    const getPrimaryData = async () => {
        setOverlayText('Loading...');
        setIsActivity(true);
        const tempContract = new httpWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);
        const price = await tempContract.methods.getTokenPrimaryPrice().call();
        setPrimaryPrice(new BigNumber(price));
        const owner = await tempContract.methods.owner().call();
        setOwnerAddress(owner);
        const amount = await getMintedCount();
        setMintedAmount(amount);
        setIsActivity(false);
    }

    const addPool = async () => {
        if(poolAmount <= 0) {
            toast('danger', 'Please input mint amount.');
            return;
        }

        const mintCost = new BigNumber(poolAmount).multipliedBy(ethUnit);
        if(balanceOfUser.comparedTo(poolAmount) < 0) {
            if(walletAddress.toUpperCase() !== ownerAddress.toUpperCase()){
                toast('danger', `You haven't enough cost for ${poolAmount} NFTS in your wallet.` );
                return;
            }
        }
        if(provider) {
            nftContract.methods.addToRewardPool(poolAmount).send({ from: walletAddress, value: (new BigNumber(poolAmount)).multipliedBy(new BigNumber(ethUnit)) })
                .on('error', function (error: any) {
                    setIsActivity(false);
                })
                .then((result: any) => {
                    getMintedCount().then((amount: number) => {
                        setMintedAmount(amount);
                    });
                    toast('success', `${poolAmount} NFTS were minted as successful.`)
                    setIsActivity(false);
                })
        }
    }

  return (
    <div className={cn(styles.connect)}>
        <div className={cn(styles.card)}>
            <div className="d-flex flex-column">
                <div className="d-flex flex-center flex-column">
                    <div className="text-white h5 font-weight-normal mt-10">My Balance</div>
                    <div className="text-white h5 font-weight-normal mt-10">{balanceOfUser.toFixed().toString()} AVAX</div>
                </div>
                <img
                    className="w-100 border-radius-20 border-5"
                    // src="/images/penguins.gif"
                    alt="Video preview"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={ poolAmount }
                    onChange={(e) => setPoolAmount(Number(e.target.value))}
                    name="search"
                    placeholder="Search"
                    required
                />
                {
                    provider ? (
                        <button
                            className={cn("button", "mt-10", styles.button)}
                            onClick={() => {
                                addPool().then();
                            }}
                        >
                            ADD POOL
                        </button>
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

export default PoolModalContent;

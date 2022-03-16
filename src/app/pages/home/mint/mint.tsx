import React, {useEffect, useState} from "react";
import { BigNumber } from 'bignumber.js';
import cn from "classnames";
import Web3 from 'web3';

import styles from "./Mint.module.sass";
import {useWallet} from "../../../core/context-provider/wallet/wallet-context";
import {avaxGeishaAbi} from "../../../core/data/web3-abi-address/abi";
import {avaxGeishaAddress} from "../../../core/data/web3-abi-address/address";
import {useOverlay} from "../../../core/context-provider/loading-overlay/loading-overlay-context";
import {toast} from "../../../core/utils/notification.util";
import {getMintedCount} from "../../../core/utils/network/geisha";

import "./mint.css";
import {environment} from "../../../../environment";
import SwiperSlider from "../swiper-slider/swiper-slider";

const Mint = () => {

    const { walletAddress, connectWallet, provider } = useWallet();

    const { setIsActivity, setOverlayText } = useOverlay();

    const [mintedAmount, setMintedAmount] = useState<number>(0);
    const [mintAmount, setMintAmount] = useState<number>(1);
    const incrementCounter = () => {
        if (mintAmount < 20)
        setMintAmount(mintAmount + 1)
    };
    const decrementCounter = () => {
        if (mintAmount > 1)
        setMintAmount(mintAmount - 1)
    };
    const [primaryPrice, setPrimaryPrice] = useState<BigNumber>(new BigNumber(0));
    const [ownerAddress, setOwnerAddress] = useState<string>('');
    const [disableMintButton, setDisableMintButton] = useState<boolean>(false);

    const httpWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rpcUrl));

    useEffect(() => {
        getPrimaryData();
    },[])

    const getPrimaryData = async () => {
        // setOverlayText('Loading...');
        // setIsActivity(false);
        const tempContract = new httpWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);
        const price = await tempContract.methods.getTokenPrimaryPrice().call();

        setPrimaryPrice(new BigNumber(price));
        const owner = await tempContract.methods.owner().call();
        setOwnerAddress(owner);
        const amount = await tempContract.methods.mintedSupply().call();
        if (amount > 0)
        setMintedAmount(amount);
        // setIsActivity(false);
    }

    const mintNfts = async () => {
        if(mintAmount <= 0) {
            toast('danger', 'Please input mint amount.');
            return;
        }
        const metaWeb3 = new Web3(provider);
        const avaxGeishaContract = new metaWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);
        const balanceOfEth = await metaWeb3.eth.getBalance(walletAddress);
        const myBalance = new BigNumber(balanceOfEth);
        const mintCost = primaryPrice.multipliedBy(mintAmount);
        if(myBalance.comparedTo(mintCost) < 0) {
            if(walletAddress.toUpperCase() !== ownerAddress.toUpperCase()){
                toast('danger', `You haven't enough cost for ${mintAmount} NFTS in your wallet.` );
                return;
            }
        }
        setDisableMintButton(true);
        if(provider) {
            avaxGeishaContract.methods.mintNfts(mintAmount).send({ from: walletAddress, value: primaryPrice.multipliedBy(mintAmount) })
                .on('error', function () {
                    setDisableMintButton(false);
                })
                .on('confirmation', function () {
                    setDisableMintButton(false);
                })
                .then((result: any) => {
                    setDisableMintButton(false);
                    getMintedCount().then((amount: number) => {
                        setMintedAmount(amount);
                    });
                    toast('success', `${mintAmount} NFTS were minted as successful.`)
                    setIsActivity(false);
                })
        }
    }

    const formatMintedAmount = () => {
        if(mintedAmount > 0)
        return mintedAmount.toLocaleString("en-US");
        return mintedAmount;
    }

  return (
      <div>
          <div id="particles-js" className="particles-container particles-js z-index-0"/>
          <div className={cn(styles.mintSection)} id="mint">
              <div className="container">
                  <div>
                      <SwiperSlider />
                      <div className="mt-70 row">
                          <div className="col-md-6 col-lg-6 text-center mt-20">
                              <img className="img-fluid border-6 border-radius-20 " src="/images/geisha.gif" alt="img"/>
                          </div>
                          <div className="col-md-6 col-lg-6 d-flex flex-column align-items-center justify-content-center bg-mint  pt-40 pb-40 mt-20">
                              <h1 className="">MINT GEISHAS</h1>
                              <h2>{formatMintedAmount()} / 10,000</h2>
                              <div className="d-flex flex-center pt-30">

                                  <div className="number-input">
                                      <button className="minus"
                                              onClick={decrementCounter}
                                      ></button>
                                      <input
                                          className="quantity"
                                          min="1"
                                          name="search"
                                          value={ mintAmount }
                                          type="number"
                                          onChange={
                                              (e) => {
                                                  if (Number(e.target.value) > 20 || Number(e.target.value) < 1) {
                                                      toast('danger', 'You can mint up to 20 items');
                                                      return;
                                                  }
                                                  setMintAmount(Number(e.target.value));
                                              }
                                          }
                                      />
                                      <button className="plus"
                                              onClick={incrementCounter}
                                      ></button>
                                  </div>
                                  {
                                      provider ? (
                                          <button
                                              className={cn("styles.button", "btn", "btn-block", 'btn-lg', 'btn-outline-danger' ,"mt-10")}
                                              onClick={() => {
                                                  mintNfts().then();
                                              }}
                                              disabled={disableMintButton}
                                          >
                                              MINT
                                          </button>
                                      ) : (
                                          <button
                                              className={cn("styles.button", "btn", "btn-block", 'btn-lg', 'btn-outline-danger' ,"mt-10")}
                                              onClick={() => connectWallet()}
                                          >
                                              Connect Wallet
                                          </button>
                                      )
                                  }
                              </div>

                              <div className="text-white h5 font-weight-normal mt-10">Mint Cost: 1.00 AVAX</div>
                              <div className="text-white h5 font-weight-normal mt-10"><small>** Please use Chrome/Firefox with Metamask Extension for PC or Metamask app for mobile</small></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Mint;

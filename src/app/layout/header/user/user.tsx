import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import {useWallet} from "../../../core/context-provider/wallet/wallet-context";
import {toast} from "../../../core/utils/notification.util";
import {
  cutWalletAddress,
  setLocalStorageWalletStatus
} from "../../../core/utils/wallet";
import {BigNumber} from "bignumber.js";
import Web3 from "web3";
import {ethUnit} from "../../../core/data/ether-unit";
import {avaxGeishaAbi} from "../../../core/data/web3-abi-address/abi";
import {avaxGeishaAddress} from "../../../core/data/web3-abi-address/address";
import {environment} from "../../../../environment";

export interface UserProps {
  className: string
}

const User = ( props: UserProps ) => {

  const { className } = props;
  const [visible, setVisible] = useState(false);
  const { walletAddress, setWalletAddress, setProvider, provider } = useWallet();
  const [balanceEth, setBalanceEth] = useState<BigNumber>(new BigNumber(0));
  const [reward, setReward] = useState<BigNumber>(new BigNumber(0));

  const httpWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rpcUrl));
  const avaxGeishaContract = new httpWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);

  useEffect(() => {
    let isSubscribed = true;
    const interval = setInterval(() => {
      if(provider) {
        httpWeb3.eth.getBalance(walletAddress).then((balance) => {
          const value = new BigNumber(balance).dividedBy(ethUnit).toFixed(4);
          if (isSubscribed) {
            setBalanceEth(new BigNumber(value));
          }
        });
        avaxGeishaContract.methods.viewUserReward(walletAddress).call().then((result: any) => {
          if (isSubscribed) {
            setReward(new BigNumber(result).div(new BigNumber(ethUnit)));
          }
        })
      }
    }, 5000);
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    }
  },[walletAddress])

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={cn(styles.head, 'px-10 py-5')} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img
                src="/images/content/avax.png"
                alt="AVAX"
            />
          </div>
          <div className={styles.wallet}>
            {balanceEth.toFixed(2).toString()} <span className={styles.currency}>AVAX</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
           
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/content/avax.png"
                    alt="AVAX"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Reward</div>
                  <div className={styles.price}>{reward.toFixed(2).toString()} AVAX</div>
                </div>
              </div>
            </div>
            <div className={styles.menu}>
              <Link
                  to="#"
                  className={styles.item}
                  onClick={async () => {
                    setVisible(!visible);
                    if(provider) {
                      const metaWeb3 = new Web3(provider);
                      const avaxGeishaContract = new metaWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);
                      const result = await avaxGeishaContract.methods.claimUserReward().send({ from: walletAddress });
                      toast('success', `The reward has been completed.`);
                    }
                  }}
              >
                <div className={styles.icon}>
                  <Icon name="user" size="20" />
                </div>
                <div className={styles.text}>Claim</div>
              </Link>
              <Link
                  to="/my-geishas"
                  className={styles.item}
                  onClick={() => setVisible(!visible)}
              >
                <div className={styles.icon}>
                  <Icon name="image" size="20" />
                </div>
                <div className={styles.text}>My Geishas</div>
              </Link>
              <Link
                  to="#"
                  className={styles.item}
                  onClick={() => {
                    setProvider(null);
                    setVisible(!visible);
                    setWalletAddress('');
                    setLocalStorageWalletStatus('').then();
                  }}
              >
                <div className={styles.icon}>
                  <Icon name="exit" size="20" />
                </div>
                <div className={styles.text}>Disconnect</div>
              </Link>              
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;

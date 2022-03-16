import React, {useCallback, useEffect, useState} from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletContext } from "./wallet-context";
import {environment} from "../../../../environment";
import {lengthOfAddress, setLocalStorageWalletStatus} from "../../utils/wallet";
import {toast} from "../../utils/notification.util";
import {avaxGeishaAbi} from "../../data/web3-abi-address/abi";
import {avaxGeishaAddress} from "../../data/web3-abi-address/address";
import {login} from "../../utils/network/geisha";

export const WalletProvider = (props: React.PropsWithChildren<{}>) => {

  const [provider, setProvider] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [pageIndex, setPageIndex] = useState<number>(-1);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const connectWallet = useCallback(async () => {

    /*
    if(!window.ethereum) {
      toast('danger', 'Please install Metamask.');
      return;
    }
    */

    const providerOptions = {
       walletconnect: {
         package: WalletConnectProvider, // required
         options: {
           infuraId: "undefined", // required
         }
       }
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    if (provider === null) {
      const _provider = await web3Modal.connect();

      const web3 = new Web3(_provider);
      setProvider(web3);

      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
      setLocalStorageWalletStatus(accounts[0]);
    } else if (localStorage.getItem(environment.localStorageKeys)) {
      const _provider = await web3Modal.connect();

      const web3 = new Web3(_provider);
      setProvider(web3);

      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
    } else {
      await web3Modal.clearCachedProvider();
      setProvider(null);
      setWalletAddress('');
      localStorage.setItem(environment.localStorageKeys, '');
    }

  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if(walletAddress.length === lengthOfAddress) {
      const httpWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rpcUrl));
      const tempContract = new httpWeb3.eth.Contract(avaxGeishaAbi, avaxGeishaAddress);
      tempContract.methods.owner().call().then((owner: string) => {
        if(walletAddress.toUpperCase() === owner.toUpperCase()) {
          login(walletAddress).then((result: any) => {
            if(result && isSubscribed) {
              setToken(result.accessToken);
              setIsOwner(true);
            }
          })
        } else {
          setIsOwner(false);
        }
      });
    } else {
      setIsOwner(false);
    }
    return () => {
      isSubscribed = false
    }
  },[walletAddress])

  return (
    <WalletContext.Provider value={{
      provider: provider,
      setProvider: setProvider,
      walletAddress: walletAddress,
      setWalletAddress: setWalletAddress,
      connectWallet: connectWallet,
      pageIndex: pageIndex,
      setPageIndex: setPageIndex,
      isOwner: isOwner,
      token: token,
    }}>
        { props.children }
    </WalletContext.Provider>
  )
}

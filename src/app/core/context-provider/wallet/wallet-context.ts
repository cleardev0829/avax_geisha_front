import { createContext, useContext } from 'react';

export type WalletContextType = {
    provider: any,
    setProvider: (provider: any) => void;
    walletAddress: string,
    setWalletAddress: (address: string) => void;
    connectWallet: () => void;
    pageIndex: number,
    setPageIndex: (pageIndex: number) => void;
    isOwner: boolean;
    token: string;
}

export const WalletContext = createContext<WalletContextType>({
    provider: null,
    setProvider: (provider: any) => {},
    walletAddress: '',
    setWalletAddress: (address: string) => {},
    connectWallet: () => {},
    pageIndex: -1,
    setPageIndex: () => {},
    isOwner: false,
    token: '',
});

export const useWallet = () => useContext(WalletContext);

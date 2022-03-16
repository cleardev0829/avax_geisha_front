import { toast } from '../notification.util';
import { environment } from '../../../../environment';
import { User } from '../../models/user';

export const bscNetworkChainId = '0xa869'; // testNet
// export const bscNetworkChainId = '0x63564c40'; // mainNet

export const isEthNetwork = async () => {
    const { ethereum } = window;
    if(!ethereum) {
        return;
    }
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (chainId.toLocaleUpperCase() !== bscNetworkChainId.toLocaleUpperCase()) {
        await switchNetwork();
        toast('danger', 'Please select network of MetaMask as "Avalanche FUJI C-Chain"');
        return false;
    }
    return true;
};

export const switchNetwork = async () => {
    const { ethereum } = window;
    if(ethereum) {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: bscNetworkChainId }],
            });
        } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: 'Avalanche FUJI C-Chain',
                                chainId: bscNetworkChainId,
                                rpcUrls: [environment.rpcUrl],
                                nativeCurrency: {
                                    name: 'AVAX',
                                    symbol: 'AVAX',
                                    decimals: 18,
                                },
                                blockExplorerUrls: ['https://testnet.snowtrace.io/'],
                            }
                        ],
                    });
                } catch (addError) {
                }
            }
        }
    }
}

export function login(walletAddress: string) {
    const data = { walletAddress: walletAddress };
    return fetch(`${ environment.serverUrl }/auth/login`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
}

export function uploadUser(user: User) {
    const data = new FormData();
    data.append( 'userName', user.userName );
    data.append( 'walletAddress', user.walletAddress );
    if(user.logoImage != null) {
        data.append( 'logoImage', user.logoImage );
    } else {
        data.append( 'logoImage', '' );
    }
    return fetch(`${ environment.serverUrl }/user/updateProfile`, {
        headers: {
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: data,
    }).then(handleResponse)
}

export function getUserByWalletAddress(walletAddress: string) {
    return fetch(`${ environment.serverUrl }/user/${walletAddress}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }).then(handleResponse)
}

function handleResponse(response: any) {
    return response.json();
}

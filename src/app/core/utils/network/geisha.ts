import {environment} from "../../../../environment";

export function login(walletAddress: string) {
    const data = { walletAddress: walletAddress };
    return fetch(`${ environment.serverUrl }/auth/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
        .catch(handleError)
}

export function createCollections(token: string) {
    return fetch(`${ environment.serverUrl }/geisha/createCollections`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    }).then(handleResponse)
    .catch(handleError)
}

export function checkDataBase(token: string) {
    return fetch(`${ environment.serverUrl }/geisha/checkDataBase`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
    }).then(handleResponse)
    .catch(handleError)
}

export function clearMinted(token: string) {
    return fetch(`${ environment.serverUrl }/geisha/clearMinted`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    }).then(handleResponse)
    .catch(handleError)
}

export function getMultiGeishaNotMinted(size: number) {
    const data = { size: size };
    return fetch(`${ environment.serverUrl }/geisha/getMultiGeishaNotMinted`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
    .catch(handleError)
}

export function getMarket(collection: string, tokenId: string) {
    const data = { collection: collection, tokenId: tokenId };
    return fetch(`${ environment.serverUrl }/geisha/getMarket`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
        .catch(handleError)
}

export function getMintedCount() {
    return fetch(`${ environment.serverUrl }/geisha/getMintedCount`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
    }).then(handleResponse)
    .catch(handleError)
}

export function getTradingVolume() {
    return fetch(`${ environment.serverUrl }/geisha/tradingVolume`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
    }).then(handleResponse)
    .catch(handleError)
}

export function getFloorPrice() {
    return fetch(`${ environment.serverUrl }/geisha/floorPrice`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
    }).then(handleResponse)
    .catch(handleError)
}

export function getGeishaByID(dbIndex: number) {
    if(dbIndex < 0) {
        return;
    }
    const data = {id: dbIndex};
    return fetch(`${ environment.serverUrl }/geisha/getGeishaByID`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
    .catch(handleError)
}

function handleResponse(response: any) {
    return response.json();
}

function handleError(error: any) {
    return null;
}

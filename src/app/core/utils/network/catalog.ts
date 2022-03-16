import { environment } from '../../../../environment';
import { Filter } from '../../models/filter';

export function getMarketPlaceItems(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/geisha/getMarketPlaceItems`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMyGeishasNoListed(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/geisha/getMyGeishasNoListed`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMintedGeishas(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/geisha/getMintedGeishas`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMyGeishasOnSale(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/geisha/getMyGeishasOnSale`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMyGeishas(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/geisha/getMyGeishas`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

function handleResponse(response: any) {
    return response.json();
}

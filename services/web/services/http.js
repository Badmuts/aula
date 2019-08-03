import ky from 'ky-universal'
import { getTokenPair, setTokenPair, isAuthenticated } from './auth'
import { from } from 'rxjs'
import { flatMap } from 'rxjs/operators';
import { baseUrl } from '../utils/url';
import atob from 'atob';
import { map } from 'rxjs/operators';

/**
 * Hook to add authorization header, checks for expired tokens and tries to refresh them when possible
 * @param {Object} options
 */
const token = async (options = {}) => {
    if (!isAuthenticated()) {
        return options
    }

    let tokenpair = getTokenPair()

    if (isTokenExpired(tokenpair.accessToken) || isTokenExpired(tokenpair.refreshToken)) {
        tokenpair = await ky.put(`${baseUrl()}/api/tokens`, {
            json: tokenpair
        }).json()

        setTokenPair(tokenpair)
    }

    options.headers = {
        ...options.headers,
        authorization: `Bearer ${tokenpair.accessToken}`
    }
    return options
}

/**
 * Checks if JWT token is expired
 * @param {String} token
 */
function isTokenExpired(token) {
    if (!token) {
        return true
    }

    const payload = JSON.parse(
        atob(
            token.split('.')[1]
        )
    )

    if (!payload.exp) {
        return true
    }

    if (payload.exp > (Date.now() / 1000)) {
        return false
    }

    return true
}

/**
 * Regular http client which refresh tokens when possible
 */
const http = ky.extend({
    prefixUrl: baseUrl(),
    hooks: {
        beforeRequest: [
            token
        ],
        afterResponse: [
            response => {
                // console.log(`HTTP RESPONSE`, response)
                return response
            }
        ]
    }
})

/**
 * Observable http client
 */
export function http$(url, options) {
    return from(http(url, options))
        .pipe(
            flatMap(res => res.json()),
        )
}

http$.get = function(url, options) {
    return from(http.get(url, options))
        .pipe(
            flatMap(res => res.json()),
        )
}

http$.post = function(url, options) {
    return from(http.post(url, options))
        .pipe(
            flatMap(res => res.json()),
        )
}

http$.patch = function(url, options) {
    return from(http.patch(url, options))
        .pipe(
            flatMap(res => res.json()),
        )
}

http$.delete = function(url, options) {
    return from(http.delete(url, options))
        .pipe(
            flatMap(res => res.json()),
        )
}


export default http

import AuthService from '../services/AuthService'
import { ajax } from 'rxjs/ajax'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs';

const authHeaders = options => Promise.resolve(options)
    .then(options => {
        options = Object.assign({}, options, {
            headers: {
                'Authorization': `Bearer ${AuthService.tokenPair.accessToken}`
            }
        })
        const { accessToken } = AuthService.tokenPair;
        const payload = AuthService._getTokenPayload(accessToken);

        if (payload.exp < (Date.now() / 1000)) {
            // renew token
            return fetch(`/api/tokens`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(AuthService.tokenPair),
            })
                .then(handleError)
                .then(res => res.json())
                .then(tokenPair => {
                    AuthService._storeTokenPair(tokenPair)
                    options.headers['Authorization'] = `Bearer ${AuthService.tokenPair.accessToken}`
                    return options
                })
        }
        return options;
    })

export const handleError = res => {
    if (!res.ok) {
        throw Error(res.statusText)
    }
    return res
}

export default (url, options) => authHeaders(options)
    .then(options => fetch(url, options))

export const http$ = (options) => of(options)
    .pipe(
        map(_options => Object.assign({}, _options, {
            headers: {
                'Authorization': `Bearer ${AuthService.tokenPair.accessToken}`
            }
        })),
        switchMap(_options => {
            const { accessToken } = AuthService.tokenPair;
            const payload = AuthService._getTokenPayload(accessToken)

            if (payload.exp < (Date.now() / 1000)) {
                // renew token
                return ajax({
                    url: `/api/tokens`,
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(AuthService.tokenPair),
                })
                    .pipe(
                        map(res => res.response),
                        map(tokenPair => {
                            AuthService._storeTokenPair(tokenPair)
                            _options.headers['Authorization'] = `Bearer ${AuthService.tokenPair.accessToken}`
                            return _options
                        })
                    )
            }

            return of(_options)
        }),
        switchMap(_options => ajax(_options)),
        map(res => res.response)
    )

http$({ url: `/api/courses` })
    .subscribe(console.log)

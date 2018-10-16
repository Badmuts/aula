import AuthService from '../services/AuthService'

const authHeaders = options => Object.assign({}, options, {
    headers: {
        'Authorization': `Bearer ${AuthService.tokenPair.accessToken}`
    }
})

export const handleError = res => {
    if (!res.ok) {
        throw Error(res.statusText)
    }
    return res
}

export default (url, options) => fetch(url, authHeaders(options))

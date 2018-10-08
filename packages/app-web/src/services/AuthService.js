export class AuthService {
    constructor() {
        this.tokenPair = {};
        this.tokenPair.accessToken = localStorage.getItem('app.accessToken')
        this.tokenPair.refreshToken = localStorage.getItem('app.refreshToken')
    }

    login({ email, password }) {
        return fetch('/api/tokens', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(handleError)
            .then(res => res.json())
            .then(tokenPair => this._storeTokenPair(tokenPair))
    }

    _storeTokenPair(tokenPair) {
        this.tokenPair.accessToken = tokenPair.accessToken;
        this.tokenPair.refreshToken = tokenPair.refreshToken

        localStorage.setItem('app.accessToken', this.tokenPair.accessToken)
        localStorage.setItem('app.refreshToken', this.tokenPair.refreshToken)
        return this.tokenPair
    }

    logout() {
        localStorage.removeItem('app.accessToken')
        localStorage.removeItem('app.refreshToken')
        this.tokenPair = {}
    }

    isAuthenticated() {
        if (!this.tokenPair.accessToken || !this.tokenPair.refreshToken) {
            return false;
        }

        try {
            const accessTokenPayload = this._getTokenPayload(this.tokenPair.accessToken)
            const refreshTokenPayload = this._getTokenPayload(this.tokenPair.refreshToken)

            if (accessTokenPayload.exp > (Date.now() / 1000)) {
                return true
            }

            if (refreshTokenPayload.exp > (Date.now() / 1000)) {
                return true
            }
        } catch (err) {
            return false;
        }
        return false
    }

    _getTokenPayload(token) {
        try {
            const tokenPayload = JSON.parse(
                atob(
                    token.split('.')[1]
                )
            )
            return tokenPayload
        } catch (err) {
            return {}
        }
    }

    register(user) {
        return fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(handleError)
            .then(res => res.json())
            .then(usr => Promise.all([
                this.login({
                    email: usr.email,
                    password: user.password
                }),
                usr
            ]))
            .then(([_, usr]) => usr)
    }
}

const handleError = res => {
    if (!res.ok) {
        throw Error(res.statusText)
    }
    return res
}

const srv = new AuthService()
export default srv

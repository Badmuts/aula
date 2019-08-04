import { Component } from 'react'
import ky from 'ky-universal';
import Cookie from 'js-cookie';
import nextCookie from 'next-cookies';
import Router from 'next/router'

let tokenpair = {
    accessToken: Cookie.get('accessToken'),
    refreshToken: Cookie.get('refreshToken')
}

async function login({ email, password }) {
    const res = await ky.post(`/api/tokens`, {
        json: { email, password }
    }).json()

    tokenpair = res

    Cookie.set('accessToken', tokenpair.accessToken)
    Cookie.set('refreshToken', tokenpair.refreshToken)
}

async function join({ name, email, password }) {
    await ky.post(`/api/users`, {
        json: { name, email, password }
    })
    await login({ email, password })
}

function logout () {
    Cookie.remove('accessToken')
    Cookie.remove('refreshToken')
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now())
    tokenpair.accessToken = null
    tokenpair.refreshToken = null
    Router.push('/auth/sign-in')
}

function isAuthenticated() {
    return !!(tokenpair.accessToken || tokenpair.refreshToken)
}

function setTokenPair({ accessToken, refreshToken }) {
    if (accessToken) {
        tokenpair.accessToken = accessToken
        Cookie.set('accessToken', accessToken)
    }
    if (refreshToken) {
        tokenpair.refreshToken = refreshToken
        Cookie.set('refreshToken', refreshToken)
    }
}

function getTokenPair() {
    return tokenpair
}

function auth(ctx) {
    const { accessToken } = nextCookie(ctx)

    /*
     * If `ctx.req` is available it means we are on the server.
     * Additionally if there's no accessToken it means the user is not logged in.
     */
    if (ctx.req && !accessToken) {
      ctx.res.writeHead(302, { Location: '/auth/sign-in' })
      ctx.res.end()
    }

    // We already checked for server. This should only happen on client.
    if (!accessToken) {
      Router.push('/auth/sign-in')
    }

    return accessToken
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

function withAuthSync (WrappedComponent) {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    constructor (props) {
      super(props)

      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/auth/sign-in')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}

export { login, logout, join, getTokenPair, setTokenPair, isAuthenticated, auth, withAuthSync }

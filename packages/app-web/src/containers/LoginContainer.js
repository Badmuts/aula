import React from 'react';
import { LoginForm } from '../components/forms/login/LoginForm';

const handleError = res => {
    if (!res.ok) {
        throw Error(res.statusText)
    }
    return res
}

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, isAuthenticated: false }
    }

    login(loginDetails) {
        this.setState({ isLoading: true })
        fetch('/api/tokens', {
            method: 'POST',
            body: JSON.stringify(loginDetails),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(handleError)
            .then(res => res.json())
            .then(() => this.isAuthenticated())
            .catch(() => this.showError())
            .finally(() => this.stopLoading())
    }

    isAuthenticated() {
        this.setState({isAuthenticated: true})
    }

    stopLoading() {
        this.setState({isLoading: false})
    }

    showError() {
        this.setState({ error: 'Something went wrong, please try again' })
    }

    render() {
        const { isLoading, isAuthenticated, error } = this.state

        if (error) {
            return <p>{error}</p>
        }

        if (isAuthenticated) {
            return <p>Login successful</p>
        }

        if (isLoading) {
            return <p>Loading...</p>
        }

        return <LoginForm onSubmit={loginDetails => this.login(loginDetails)} />
    }
}

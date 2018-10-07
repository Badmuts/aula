import React from 'react';
import { SignupForm } from '../components/forms/signup/SignupForm';

const handleError = res => {
    if (!res.ok) {
        throw Error(res.statusText)
    }
    return res
}

export class SignupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, isAuthenticated: false }
    }

    signup(user) {
        this.setState({ isLoading: true })
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
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
            return <p>Signup successful</p>
        }

        if (isLoading) {
            return <p>Loading...</p>
        }

        return <SignupForm onSubmit={user => this.signup(user)} />
    }
}

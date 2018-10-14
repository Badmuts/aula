import React from 'react';
import { SignupForm } from '../components/forms/signup/SignupForm';
import AuthService from '../services/AuthService';
import Redirect from 'react-router-dom/Redirect';
import Link from 'react-router-dom/Link';

export class SignupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, isAuthenticated: AuthService.isAuthenticated() }
    }

    signup(user) {
        this.setState({ isLoading: true })
        AuthService.register(user)
            .then(() => this.setState({isAuthenticated: true}))
            .catch(() => this.setState({ error: 'Something went wrong, please try again' }))
            .finally(() => this.setState({isLoading: false}))
    }

    render() {
        const { isLoading, isAuthenticated, error } = this.state

        if (error) {
            return <p>{error}</p>
        }

        if (isAuthenticated) {
            return <Redirect to="/" />
        }

        if (isLoading) {
            return <p>Loading...</p>
        }

        return <SignupForm onSubmit={user => this.signup(user)} />
    }
}

import React from 'react';
import { LoginForm } from '../components/forms/login/LoginForm';
import AuthService from '../services/AuthService';
import { Redirect, Link } from 'react-router-dom';

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, isAuthenticated: AuthService.isAuthenticated() }
    }

    login(loginDetails) {
        this.setState({ isLoading: true })
        AuthService.login(loginDetails)
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

        return (
            <div>
                <LoginForm onSubmit={loginDetails => this.login(loginDetails)} />
                <Link to="/auth/signup">Signup</Link>
            </div>
        )
    }
}

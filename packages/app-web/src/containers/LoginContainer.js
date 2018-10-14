import React from 'react';
import { LoginForm } from '../components/forms/login/LoginForm';
import AuthService from '../services/AuthService';

const LoginContainer = ({login, isLoading, error}) => (
    <LoginForm onSubmit={login} />
)

export default ({ history, ...props }) => (
    <LoginContainer
        {...props}
        login={loginDetails => AuthService.login(loginDetails)
            .then(() => history.push('/'))}
        />
)

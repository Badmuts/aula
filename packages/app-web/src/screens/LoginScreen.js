import React from 'react';
import LoginContainer from '../containers/LoginContainer';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default (props) => AuthService.isAuthenticated()
    ? <Redirect to="/" />
    : <LoginContainer {...props} />

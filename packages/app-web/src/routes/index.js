import React from 'react';
import { Route } from 'react-router-dom';

import App from '../components/App/App';
import LoginScreen from '../screens/LoginScreen';
import { SignupContainer } from '../containers/SignupContainer';
import PrivateRoute from './PrivateRoute';

export default (
    <div>
        <PrivateRoute exact path="/" component={App} />
        <Route path="/auth/login" component={LoginScreen} />
        <Route path="/auth/signup" component={SignupContainer} />
    </div>
)

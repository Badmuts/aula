import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'
import AuthService from '../services/AuthService'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            AuthService.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/auth/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default PrivateRoute

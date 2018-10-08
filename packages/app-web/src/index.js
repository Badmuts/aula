import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { LoginContainer } from './containers/LoginContainer';
import { SignupContainer } from './containers/SignupContainer';
import PrivateRoute from './components/PrivateRoute';

const Routes = () => (
    <Router>
        <div>
            <PrivateRoute exact path="/" component={App} />
            <Route path="/auth/login" component={LoginContainer} />
            <Route path="/auth/signup" component={SignupContainer} />
        </div>
    </Router>
)

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import App from '../components/App/App';
import NavbarContainer from '../containers/NavbarContainer';

export default (props) => (
    <div>
        <NavbarContainer {...props} />
        <App {...props} />
    </div>
)

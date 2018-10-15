import React from 'react';
import App from '../components/App/App';
import NavbarContainer from '../containers/NavbarContainer';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Loader from '../components/Loader';

export default (props) => (
    <div>
        <NavbarContainer {...props} />
        <div className="container">
            <Sidebar />
            <Hero />
            <Loader style={{gridRow: '2', gridColumn: 'span 12'}} />
        </div>
    </div>
)

import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import Sidebar from '../containers/SidebarContainer';
import Hero from '../components/ui/Hero';

export default (props) => (
    <div>
        <NavbarContainer {...props} />
        <div className="container">
            <Sidebar {...props} />
            <Hero />
        </div>
    </div>
)

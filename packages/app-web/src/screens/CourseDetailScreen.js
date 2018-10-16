import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import Sidebar from '../containers/SidebarContainer';

export default (props) => (
    <div>
        <NavbarContainer {...props} />
        <div className="container">
            <Sidebar {...props} />
            <div style={{gridColumn: 'span 10'}}>
                <h1>Course {props.match.params.id}</h1>
            </div>
        </div>
    </div>
)

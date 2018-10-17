import React from 'react'
import './tabbar.css'

export default (props) => (
    <nav className="tabs">
        {props.children}
    </nav>
)

import React from 'react'
import './nav.css'

export default (props) => (
    <div className="nav">
        <span className="nav-title">{props.title}</span>
        <ul>
            {props.children.map(child => <li>{child}</li>)}
        </ul>
    </div>
)

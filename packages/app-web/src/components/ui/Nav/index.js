import React from 'react'
import './nav.css'

export default (props) => (
    <div className="nav">
        <span className="nav-title">{props.title}</span>
        <ul>
            {props.children && props.children.map((child, i) => <li key={i}>{child}</li>)}
        </ul>
    </div>
)

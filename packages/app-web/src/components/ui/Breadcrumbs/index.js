import React from 'react'
import './breadcrumbs.css'

export default (props) => (
    <ol className="breadcrumbs" {...props}>{props.children}</ol>
)

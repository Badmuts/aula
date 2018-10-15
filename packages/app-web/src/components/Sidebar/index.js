import React from 'react'
import Nav from '../Nav'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default (props) => (
    <div className="sidebar">
        <Nav title="Courses">
            <Link to="/courses/0">iweb</Link>
            <Link to="/courses/1">iiad</Link>
            <Link to="/courses/2">idepa</Link>
            <Link to="/courses/3">ipsenh</Link>
        </Nav>
    </div>
)

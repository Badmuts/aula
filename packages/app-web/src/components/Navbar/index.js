import React from 'react';
import logo from '../forms/login/logo.svg'
import iconSearch from './icon-search.svg'
import './navbar.css'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div className="brand">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <div className="search">
                    <img src={iconSearch} className="search-icon" />
                    <input type="text" placeholder="Zoeken..." />
                </div>

                <div className="nav-options">
                    <img src="//gravatar.com/avatar/8aa5cf1c09d31cf3ca0d31ae5a179d89" className="avatar" />
                </div>
            </nav>
        )
    }
}

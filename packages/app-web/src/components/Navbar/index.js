import React from 'react';
import logo from '../forms/login/logo.svg'
import iconSearch from './icon-search.svg'
import './navbar.css'
import { Link } from 'react-router-dom'
import Loader from '../Loader';
import Dropdown from '../Dropdown';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchBoxIsOpen: false,
            isLoading: false
        }
    }

    render() {
        return (
            <div className="navbar-wrapper">
                <nav className="navbar">
                    <div className="brand">
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="search">
                        <img src={iconSearch} className="search-icon" />
                        <input type="text" placeholder="Zoeken..." tabIndex="1"
                            onFocus={() => this.setState({ searchBoxIsOpen: true })}
                            onBlur={() => this.setState({ searchBoxIsOpen: false })}
                            onChange={(e) => this.setState({ query: e.target.value })}
                        />
                        <div className={["search-box", this.state.searchBoxIsOpen && "is-open"].join(' ')}>
                            <div className="search-results">
                                {this.state.isLoading
                                    ? <Loader />
                                    : (<div>
                                        <div className="search-item">Hello World!</div>
                                        <div className="search-item">Hello World!</div>
                                        <div className="search-item">Hello World!</div>
                                        <div className="search-item">Hello World!</div>
                                        <hr />
                                        <div className="search-item">Hello World!</div>
                                        <div className="search-item">Hello World!</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="nav-options">
                        <Dropdown items={[
                            <a href="#" onClick={() => this.props.onLogout()}>Logout</a>]
                        }>
                            <img src="//gravatar.com/avatar/8aa5cf1c09d31cf3ca0d31ae5a179d89" className="avatar" />
                        </Dropdown>
                    </div>
                </nav>
            </div>
        )
    }
}

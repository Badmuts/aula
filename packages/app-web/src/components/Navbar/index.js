import React from 'react';
import logo from '../forms/login/logo.svg'
import iconSearch from './icon-search.svg'
import './navbar.css'
import { Link } from 'react-router-dom'
import Loader from '../Loader';
import Dropdown from '../Dropdown';

export class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchBoxIsOpen: false,
            isLoading: false,
            query: ''
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
                            onFocus={() => this.state.query.length && this.setState({ searchBoxIsOpen: true })}
                            onBlur={() => this.setState({ searchBoxIsOpen: false })}
                            onChange={(e) => this.setState({ searchBoxIsOpen: true, query: e.target.value }, () => this.props.onSearch(this.state.query))}
                        />
                        <div className={["search-box", (this.state.searchBoxIsOpen && this.state.query.length && this.props.searchResults.length) && "is-open"].join(' ')}>
                            <div className="search-results">
                                {this.props.isLoading
                                    ? <Loader />
                                    : (<div>
                                        {this.props.searchResults.map(item => <div className="search-item" key={item._id} onClick={() => this.props.history.push(`/courses/${item._id}`)}>{item._source.name}</div>)}
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
                            <img src={this.props.user.avatarUrl} className="avatar" />
                        </Dropdown>
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.defaultProps = {
    searchResults: []
}

export default Navbar

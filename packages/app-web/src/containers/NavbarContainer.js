import React from 'react';
import Navbar from '../components/Navbar';
import AuthService from '../services/AuthService';
import SearchService from '../services/SearchService';

class NabarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [],
            isSearching: false
        }
    }

    onSearch(query) {
        this.setState({ isSearching: true })
        SearchService.search(query)
            .then(results => this.setState({ searchResults: results }))
            .finally(() => this.setState({ isSearching: false }))
    }

    render() {
        return <Navbar {...this.props}
            onLogout={() => AuthService.logout()}
            user={{ avatarUrl: '//gravatar.com/avatar/8aa5cf1c09d31cf3ca0d31ae5a179d89' }}
            onSearch={q => this.onSearch(q)}
            searchResults={this.state.searchResults}
            isLoading={this.state.isSearching}
        />
    }
}

export default NabarContainer

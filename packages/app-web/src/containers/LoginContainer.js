import React from 'react';

const handleError = res => {
    if (!res.ok) {
        throw Error(res.statusText)
    }
    return res
}

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', isLoading: false, isAuthenitcated: false }
    }

    onChange(e) {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        this.login()
    }

    login() {
        this.setState({ isLoading: true })
        fetch('http://localhost:3000/tokens', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(handleError)
            .then(res => res.json())
            .then(console.log)
            .then(() => this.isAuthenitcated)
            .catch(console.error)
            .finally(() => this.stopLoading)
    }

    isAuthenitcated() {
        this.setState({isAuthenitcated: true})
    }

    stopLoading() {
        this.setState({isLoading: false})
    }

    render() {
        const { isLoading, isAuthenitcated } = this.state

        if (isLoading) {
            return <p>Loading...</p>
        }

        if (isAuthenitcated){
            return <p>Login successful</p>
        }

        return (
            <form action="#" onSubmit={e => this.onSubmit(e)}>
                <h1>Login</h1>
                <label for="email">email</label>
                <input type="email" id="email" name="email" placeholder="janedoe@example.com" required tabIndex="1" onChange={e => this.onChange(e)} />

                <label for="password">password</label>
                <input type="password" id="password" name="password" tabIndex="2" required onChange={e => this.onChange(e)} />

                <button type="submit" tabIndex="3">Login</button>
            </form>
        )
    }
}

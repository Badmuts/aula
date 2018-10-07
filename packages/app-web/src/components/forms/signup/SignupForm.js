import React from 'react'

export class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onChange(e) {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <form action="#" onSubmit={e => this.onSubmit(e)}>
                <h1>Signup</h1>
                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" placeholder="Jane Doe" required tabIndex="1" onChange={e => this.onChange(e)} />

                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" placeholder="janedoe@example.com" required tabIndex="2" onChange={e => this.onChange(e)} />

                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password" tabIndex="3" required onChange={e => this.onChange(e)} />

                <button type="submit" tabIndex="3">Register</button>
            </form>
        )
    }
}

import React from 'react'
import '../login/LoginForm.css'
import { Link } from 'react-router-dom'
import logo from '../login/logo.svg'

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
            <div>
                <form className="LoginForm" action="#" onSubmit={e => this.onSubmit(e)}>
                    <img src={logo} alt="Logo"/>
                    <hr />
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Jane Doe" required tabIndex="1" onChange={e => this.onChange(e)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="janedoe@example.com" required tabIndex="2" onChange={e => this.onChange(e)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" tabIndex="3" required onChange={e => this.onChange(e)} />

                    <button type="submit" tabIndex="3">Signup</button>
                </form>
                <Link className="signup-link" to="/auth/login">Login</Link>
            </div>
        )
    }
}

import React, { Component } from 'react';
import {API_URL} from '../constants';
import {server} from '../server'
import {Link} from 'react-router-dom'

export class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    createUser = () => {
        // console.log('h', this.state)
        server.post(`${API_URL}/users/`, (this.state)) 
        .then( user => {
            this.props.onSignUp(user.token, user, user.id, user.name, user.email)
            this.props.history.push(`/users/${user.id}`)
        })
    
    }
    
    render() {
        const {name, email, password} = this.state
        return (
            <div className="signup-form">
                <div>
                <h1>Sign Up</h1>
                    <div>
                        <label>Name</label>
                        <input onChange={this.handleChange} value={name} name="name" type="text" />
                    </div>
                <div>
                <label>Email</label>
                <input onChange={this.handleChange} value={email} name="email" type="text" />
                </div>
            <div>
                <label>Password</label>
                <input onChange={this.handleChange} value={password} name="password" type="password" />
            </div>
            <button onClick={this.createUser}>Create User</button>
            <button><Link to="login">Login</Link></button>
            </div>
        </div>
        );
    }
}

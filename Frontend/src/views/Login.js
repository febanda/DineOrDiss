import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { API_URL } from '../constants';

export class Login extends Component {

    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    logIn = () => {
        
        fetch(`${API_URL}/auth`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
         .then(res => res.json())
        // .then(console.log)
         .then( (user) => {
             this.props.onLogin(user.token, user, user.id, user.name, user.email)
             this.props.history.push(`/users/${user.id}`)
         } )
     }
 
    
    
    render() {
        const {email, password} = this.state
        return (
        <div className="login-container">
            <div>
                <h1>Login</h1>
                <div>
                    <label>Email: </label>
                    <input onChange={this.handleChange} value={email} name="email" type="text" />
                </div>
                <div className="passwordfield">
                    <label>Password: </label>
                    <input onChange={this.handleChange} value={password} name="password" type="password" />
                </div>
                <div className="loginbuttons">
                    <button onClick={this.logIn}>Sign In</button><br/>
                    <button><Link to="SignUp">Create Account</Link></button>
                </div>
            </div>
        </div>
        );
    }
}

export default Login;
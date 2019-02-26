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
        //  .then(console.log)
         .then( (user) => {
             this.props.onLogin(user.token, user)
             this.props.history.push(`/users/${user.id}`)
         } )
     }
 
    
    
    render() {
        const {email, password} = this.state
        return (
            <div>
            <h1>Login!</h1>
            <div>
                <label>Email</label>
                <input onChange={this.handleChange} value={email} name="email" type="text" />
            </div>
            <div>
                <label>Password</label>
                <input onChange={this.handleChange} value={password} name="password" type="text" />
            </div>
            <button onClick={this.logIn}>Sign In</button>
            <Link to="SignUp">Create Account</Link>
        </div>
        );
    }
}

export default Login;
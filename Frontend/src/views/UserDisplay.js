
import React, { Component } from 'react';
import { API_URL } from '../constants';
import {YelpContainer} from '../YelpContainer';
import {Link} from 'react-router-dom'
import {Matches} from './Matches'


export class UserDisplay extends Component {


    state = {
        user: {}
    }
    

    componentDidMount(){
        fetch(`${API_URL}/users/${this.props.match.params.id}`,{
            headers:{
                Authorization: `BEARER ${this.props.token}`
            }
        })
            .then( res => res.json())
            .then( user => this.setState({ user }))
    }

    render() {
       console.log(this.state.user)
        const { name } = this.state.user
        return (
            <div>
                <span style={{float: 'right'}}>{name}</span>
                <button onClick={() => this.props.logOut(this.props.history)}>Logout</button>
                <button><Link to={{pathname: '/matches'}}>Matches</Link></button>
                <YelpContainer/>
            </div>
        );
    }
}


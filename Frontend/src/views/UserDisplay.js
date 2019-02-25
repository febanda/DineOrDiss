
import React, { Component } from 'react';
import { API_URL } from '../constants';
import {YelpContainer} from '../YelpContainer';
export class UserDisplay extends Component {

    state = {
        user: {}
    }
    

    componentDidMount(){
        console.log('hello')
        fetch(`${API_URL}/users/${this.props.match.params.id}`,{
            headers:{
                Authorization: `BEARER ${this.props.token}`
            }
        })
            .then( res => res.json())
            .then( user => this.setState({ user }))
    }

    render() {
        // const { name } = this.state.user
        return (
            <div>
                <YelpContainer/>
            </div>
        );
    }
}


import React, { Component } from 'react';
import { API_URL } from '../constants';
import axios from "axios";
import {MatchedCard} from './MatchedCard'



export class Matches extends Component {



  
    render() {
        let restaurants = (this.props.location.state.matchedrestaurants)
        console.log(restaurants)
        return (
            <div>
                <div>
                {restaurants.map(restaurant => {
                    return <MatchedCard key={restaurant.id} selectedRestaurant={restaurant}/>
                })}
            </div>
            </div>
        );
    }
}

export default Matches;
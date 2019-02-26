import React, { Component } from 'react';
import {RestaurantCard} from './views/RestaurantCard'

class RestaurantList extends Component {
    render() {
        return (
            <div>
                {this.props.restaurants.map(restaurant => {
                    return <RestaurantCard key={restaurant.id} selectedRestaurant={restaurant} moreInfo={this.props.info}/>
                })}
            </div>
        );
    }
}

export default RestaurantList;
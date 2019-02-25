import React, { Component } from 'react';

export class RestaurantCard extends Component {
    render() {
        const restaurant = this.props.selectedRestaurant
        return (
            <div>
                <h1>{restaurant.name}</h1>
            </div>
        );
    }
}

export default RestaurantCard;
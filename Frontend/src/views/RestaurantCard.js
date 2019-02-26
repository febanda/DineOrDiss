import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

export class RestaurantCard extends Component {
    render() {
        const restaurant = this.props.selectedRestaurant
        return (
            <Card>
            <div>
                <div className="image">
                <img src={restaurant.image_url} width="200"></img>
                </div>
                <div className="name">Name: {restaurant.name}</div>
                <div className="price">Price: {restaurant.price}</div>
                <div className="rating">Rating: {restaurant.rating}</div>
    
            
            </div>
           </Card>
        );
    }
}

export default RestaurantCard;
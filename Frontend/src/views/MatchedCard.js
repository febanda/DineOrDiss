import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'

export class MatchedCard extends Component {
    render() {
        let restaurant = this.props.selectedRestaurant 
        return (
            <div>
                <div className="image">
                <Image src={restaurant.image_url} width="200"></Image>
                </div>
                <div className="name">Name: {restaurant.name}</div>
                <div className="price">Price: {restaurant.price}</div>
                <div className="rating">Rating: {restaurant.rating}</div>
            </div>
        );
    }
}

export default MatchedCard;
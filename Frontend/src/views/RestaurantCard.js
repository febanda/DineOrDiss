import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom' 

export class RestaurantCard extends Component {

    
    render() {
        const restaurant = this.props.selectedRestaurant
        return (
            <Card>
            <div>
                <div className="image">
                <Image src={restaurant.image_url} width="200"></Image>
                </div>
                <div className="name">Name: {restaurant.name}</div>
                <div className="price">Price: {restaurant.price}</div>
                <div className="rating">Rating: {restaurant.rating} / Total Reviews: {restaurant.review_count}</div>
                <Link to={{ pathname: '/restaurantpage', state: { id: restaurant.id}}}>Main</Link>
                <button onClick={() => this.props.sendToMatch(restaurant)}>Like!</button>
    
            
            </div>
           </Card>
        );
    }
}

export default RestaurantCard;
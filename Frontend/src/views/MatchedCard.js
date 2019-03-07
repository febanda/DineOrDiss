import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'

export class MatchedCard extends Component {
    render() {
        const restaurant = this.props.selectedRestaurant 
        console.log(this.props)
        return (
            <div className="matchcontainer">
                <div className="matchcard">
                        <div className="matchinfo">
                            <div className="image">
                            <Image src={restaurant.image_url} width="200"></Image>
                            </div>
                            <div className="name">Name: {restaurant.name}</div>
                            <div className="price">Price: {restaurant.price}</div>
                            <div className="rating">Rating: {restaurant.rating}</div>
                            <button onClick={() => this.props.deleteMatch(restaurant)}>Delete!</button>
                        </div>
                </div>
            </div>
        );
    }
}

export default MatchedCard;
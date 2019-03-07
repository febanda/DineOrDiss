import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom' 



export class RestaurantCard extends Component {


    
    
    render() {
        const restaurant = this.props.selectedRestaurant

        
        
        return (
            
            <div className="restcard">
                <div className="buttons">
                    <button className="leftbutton" styles="vertical-align:middle" onClick={() => this.props.addIndex()}><span>Diss!</span></button>
                    <div className="image">
                        <Image src={restaurant.image_url} width="350"></Image>
                    </div>

                    
                     <button className="rightbutton" onClick={() => {this.props.sendToMatch(restaurant); this.props.addIndex()}}><span>Like!</span></button>
                </div>

                <div>
                    <div className="name">Name: {restaurant.name}</div>
                    <div className="price">Price: {restaurant.price}</div>
                    <div className="rating">Rating: {restaurant.rating} / Total Reviews: {restaurant.review_count}</div>
                    <button><Link to={{ pathname: '/restaurantpage', state: { id: restaurant.id}}}>Info</Link></button>
                </div>

            </div>
           
        );
    }
}

export default RestaurantCard;
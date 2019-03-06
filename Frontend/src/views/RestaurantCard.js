import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom' 
import Swiper from 'react-id-swiper'


export class RestaurantCard extends Component {

    
    render() {
        const restaurant = this.props.selectedRestaurant

        
            const params = {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: true,
                grabCursor: true,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                } 
        }
        
        return (
            <Swiper {...params}>
            <div>
                <button onClick={() => this.props.addIndex()}>Diss</button>
                <div className="image">
                <Image src={restaurant.image_url} width="200"></Image>
                </div>
                <div className="name">Name: {restaurant.name}</div>
                <div className="price">Price: {restaurant.price}</div>
                <div className="rating">Rating: {restaurant.rating} / Total Reviews: {restaurant.review_count}</div>
                <Link to={{ pathname: '/restaurantpage', state: { id: restaurant.id}}}>Main</Link>
                <button onClick={() => this.props.sendToMatch(restaurant)}>Like!</button>
    
            
            </div>
            </Swiper>
        );
    }
}

export default RestaurantCard;
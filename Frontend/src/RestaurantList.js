import React, { Component } from 'react';
import {RestaurantCard} from './views/RestaurantCard'

class RestaurantList extends Component {

    constructor(){
        super()
        this.state= {
            current_index: 0
        }
    }

    addIndex = () => {
        this.setState({
            current_index: this.state.current_index + 1
        })
    }
    
    render() {
        console.log(this.props.restaurants)
        let current_restaurant = this.props.restaurants[this.state.current_index]
        console.log(current_restaurant)
        return (
            <div>

               {current_restaurant && <RestaurantCard selectedRestaurant={current_restaurant} moreInfo={this.props.info} sendToMatch={this.props.sendToMatch} addIndex={this.addIndex}/>}
                
                {/* {this.props.restaurants.map(restaurant => {
                    return <RestaurantCard key={restaurant.id} selectedRestaurant={restaurant} moreInfo={this.props.info} sendToMatch={this.props.sendToMatch}/>
                })} */}
            </div>
        );
    }
}

export default RestaurantList;
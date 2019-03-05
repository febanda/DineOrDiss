import React, { Component } from 'react';
import {MatchedCard} from './MatchedCard'



export class Matches extends Component {



  
    render() {
        let restaurants = this.props
    //     if(this.props.location.value){
    //         restaurants = this.props.location.value
    //     }
    //    else{
    //         restaurants = this.props
    //    }
        console.log(this.props)
        return (
            <div>
                <div>
                {restaurants.matchedrestaurants.map(restaurant => {
                    return <MatchedCard key={restaurant.id} selectedRestaurant={restaurant} deleteMatch={restaurants.deleteMatch}/>
                })}
            </div>
            </div>
        );
    }
}

export default Matches;
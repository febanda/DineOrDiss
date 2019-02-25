import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "./constants";
import RestaurantList from "./RestaurantList"




const config = {
    method: 'GET',
    headers: {'Authorization': `Bearer ${API_KEY}`},
    params: {
        term: 'burgers',
        location: '708 main st'
    }
}

export class YelpContainer extends Component {

    constructor(){
        super()
        this.state = {
            restaurants: [],
            isLoading: false
        }
    }


  componentWillMount(){

      axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
      .then(res => {
          this.setState({
              restaurants: res.data.businesses,
              isLoading: true
          })
      })
  }

  

  render() {
      console.log(this.state.restaurants)
    return (

      <div>
          {this.state.isLoading ?  <h1>Choose a place to eat!</h1> : <h1>Loading...</h1>}
            <RestaurantList restaurants={this.state.restaurants}/>
      </div>
    );
  }
}

export default YelpContainer;

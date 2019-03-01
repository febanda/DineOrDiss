import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "./constants";
import RestaurantList from "./RestaurantList"
import SearchForm from "./SearchForm"
import _ from "lodash"
import {API_URL} from './constants';
// import {server} from '../server'






const config = {
    method: 'GET',
    headers: {'Authorization': `Bearer ${API_KEY}`},
    params: {
        // term: 'restaurants',
        latitude: 29.760799,
        longitude: -95.369507,
        sort_by: 'distance',
        limit: 10
    }
}

export class YelpContainer extends Component {

    

    

    constructor(){
        super()
        this.state = {
            keywordSearch: '',
            restaurants: [],
            isLoading: false,
            restaurant_id: null
            
            
        }
    }


// axios uses 
  componentDidMount(){
    
      axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
      .then(res => {
          this.setState({
              restaurants: res.data.businesses,
              isLoading: true
          })
      })
  }

handleSearch = (searchItem) => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchItem}`, config)
    .then(res => {
        this.setState({
            keywordSearch: searchItem,
            restaurants: res.data.businesses
        })
    })
}



sendToMatch = () => {
    
    let axiosConfig = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    }
    
    let matchData = {
        restaurant_id : this.state.restaurant_id, 
        user_id: parseInt(localStorage.user_id)
    }

axios.post(`${API_URL}/matches`, matchData, axiosConfig)
.then(console.log('Done'))


}




sendToRestaurant = (selectedRestaurant) => {
    // 
    let postData = {
        business_id : selectedRestaurant.id
    }


    let axiosConfig = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    }
    
    axios.post(`${API_URL}/restaurants`, postData, axiosConfig) 
    .then(restaurant => {
        this.setState({restaurant_id:  restaurant.data.id
    }, () => {this.sendToMatch()})})

    // console.log(matchData)
    // .then(axios.post(`${API_URL}/matches`, matchData, axiosConfig))
    // .then(console.log('Done'))

}




  render() {
    //   You can make a debounce constant and pass it to the search form, then with the input from the form you pass it back to debounce so it can hand it over to the handleSearch method then wait the desired amount of time before running
    const debounce = _.debounce(term => {
        this.handleSearch(term)
    }, 500)
      console.log(this.state.restaurants)
    return (
        <div>
            <SearchForm handleSearch={debounce}/>
          {this.state.isLoading ?  <h1>Choose a place to eat!</h1> : <h1>Loading...</h1>}
            <RestaurantList restaurants={this.state.restaurants} info={this.sendToDetail} sendToMatch={this.sendToRestaurant}/>
           
        </div>
    );
  }
}

export default YelpContainer;

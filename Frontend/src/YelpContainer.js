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


sendToMatch = (selectedRestaurant) => {
    // 
    let postData = JSON.stringify({
        business_id : selectedRestaurant.id
    })
    
    axios.post(`${API_URL}/restaurants`, 
       postData ,
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
           }
    })
    .then(axios.post())
}

// createUser = () => {
//     // console.log('h', this.state)
//     server.post(`${API_URL}/users/`, (this.state)) 
//     .then( user => {
//         this.props.onSignUp(user.token, user)
//         this.props.history.push(`/users/${user.id}`)
//     })

// }



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
            <RestaurantList restaurants={this.state.restaurants} info={this.sendToDetail} sendToMatch={this.sendToMatch}/>
           
        </div>
    );
  }
}

export default YelpContainer;

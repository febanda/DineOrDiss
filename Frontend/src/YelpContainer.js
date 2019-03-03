import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "./constants";
import RestaurantList from "./RestaurantList"
import SearchForm from "./SearchForm"
import _ from "lodash"
import {API_URL} from './constants';
import {Link} from 'react-router-dom' 
// import {server} from '../server'


// let updateElementInArray = (array, id, values) => {
//   return array.map( (element) => {
//     if(element.id == id){
//       return { ...element, ...values }
//     } else {
//       return element
//     }
//   })
// }



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
            user: {},
            user_id : parseInt(localStorage.user_id),
            keywordSearch: '',
            restaurants: [],
            isLoading: false,
            restaurant_id: null,
            matches: [],
            matchedrestaurants: []
            
        }
    }

   
  componentDidMount(){
    axios.get(`${API_URL}/users/${this.props.match.params.id}`,{
        headers:{
            Authorization: `BEARER ${this.props.token}`
        }
    })
        .then( user => this.setState({ user }, () => {this.searchRestaurant()}))
    
  }

  searchRestaurant = () => {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
  .then(res => {
      this.setState({
          restaurants: res.data.businesses,
          isLoading: true
      })
  })
  .then(() => {this.showMatch()})
  }

handleSearch = (searchItem) => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchItem}`, config)
    .then(res => {
        this.setState({
            keywordSearch: searchItem,
            restaurants: res.data.businesses
        })
    })
    .then(() => {this.showMatch()})
}



sendToMatch = (selectedRestaurant) => {
    console.log(selectedRestaurant)
    let axiosConfig = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    }
    
    let matchData = {
        business_id : selectedRestaurant.id, 
        user_id: this.state.user_id
    }

axios.post(`${API_URL}/matches`, matchData, axiosConfig)
.then(() => {this.showMatch()})


}

showMatch = () => {
    let axiosConfig = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    }
    axios.get(`${API_URL}/matches`, axiosConfig)
    .then(matches => {
        this.setState({
            matches: matches.data
        }, ()=> {this.getBusinessId()})})

    
}

getBusinessId = () => {
   

    let user_matches = this.state.matches.filter(match => {
     return match.user_id === this.state.user_id
    })

    let arr = []

    this.state.restaurants.forEach(restaurant => {
        
        for(let i = 0; i < user_matches.length; i++){
           if(restaurant.id === user_matches[i].business_id){
            arr.push(restaurant)
           }
               
            
        }})

    arr = arr.filter((v, i, a) => a.indexOf(v) === i)    
    
    this.setState({
        matchedrestaurants: arr
    }, () => {console.log(this.state.matchedrestaurants)})
        
}


  render() {
    //   You can make a debounce constant and pass it to the search form, then with the input from the form you pass it back to debounce so it can hand it over to the handleSearch method then wait the desired amount of time before running
    const debounce = _.debounce(term => {
        this.handleSearch(term)
    }, 500)
      console.log(this.state.restaurants)
    return (
        <div>
        <div>
        <button onClick={() => this.props.logOut(this.props.history)}>Logout</button>

        <Link to={{pathname: '/matches', state: {matchedrestaurants: this.state.matchedrestaurants}}}>Matches</Link>
        </div>
        <div>
     
            <SearchForm handleSearch={debounce}/>
          {this.state.isLoading ?  <h1>Dine or Diss!</h1> : <h1>Loading...</h1>}
            <RestaurantList restaurants={this.state.restaurants} info={this.sendToDetail} sendToMatch={this.sendToMatch}/>
           
        </div>
        </div>

    );
  }
}

export default YelpContainer;

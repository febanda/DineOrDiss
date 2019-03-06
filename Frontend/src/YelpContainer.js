import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "./constants";
import RestaurantList from "./RestaurantList"
import SearchForm from "./SearchForm"
import _ from "lodash"
import {API_URL} from './constants';
import {PriceForm} from "./PriceForm"
import {Matches} from "./views/Matches"



     



    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(displayLocationInfo);
    //   }
    
    
    //   let location = []


    // function displayLocationInfo(position) {
    //     let lng = position.coords.longitude;
    //     let lat = position.coords.latitude;
    //     location.push(lng, lat)
    //     console.log(`longitude: ${lng} | latitude: ${lat}`)
    // }
       
       
    

    



const config = {
    method: 'GET',
    headers: {'Authorization': `Bearer ${API_KEY}`},
    params: {
        latitude: null,
        longitude: null,
        sort_by: 'rating',
        limit: 30
    }
}

export class YelpContainer extends Component {


    constructor(){
        super()
        this.state = {
            user: {},
            user_id : parseInt(localStorage.user_id),
            keywordSearch: '',
            priceSearch: '',
            restaurants: [],
            isLoading: false,
            restaurant_id: null,
            matches: [],
            matchedrestaurants: [],
            searchValue: '1',
            match_ids: [],
            showMatches: false
            
        }
         
    }

   
   
  componentDidMount(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async(position) => {
            config.params.longitude = position.coords.longitude;
            config.params.latitude = position.coords.latitude;
            const user = await axios.get(`${API_URL}/users/${this.props.match.params.id}`,{
                headers:{
                    Authorization: `BEARER ${this.props.token}`
                }
            })
                // .then( user => this.setState({ user }, () => {this.searchRestaurant()}))
                this.setState({ user }, () => {this.searchRestaurant()})
            // console.log(`longitude: ${lng} | latitude: ${lat}`)
            console.log(config.params.longitude, config.params.latitude)
        });
      }
    
    
        
    
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
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchItem}&price=${this.state.searchValue}`, config)
    .then(res => {
        this.setState({
            keywordSearch: searchItem,
            restaurants: res.data.businesses
        })
    })
    .then(() => {this.showMatch()})
}

priceFilter = (value) => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?price=${value}`, config)
    .then(res => {
        this.setState({
            priceSearch: value,
            restaurants: res.data.businesses,
            searchValue: value
        })
    })
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


deleteMatch = (restaurant) => {

    let match = this.state.matches.find(match => {
        return match.user_id === this.state.user_id && match.business_id == restaurant.id 
    })
    
    let axiosConfig = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    }

    axios.delete(`${API_URL}/matches/${match.id}`, axiosConfig)
    .then(this.showMatch)
   
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
        matchedrestaurants: arr,
        
    }, () => {console.log(this.state.matchedrestaurants)})
        
}

changeView = () => {
    this.setState({
        showMatches: !this.state.showMatches
    })
}

  render() {
   
    //   You can make a debounce constant and pass it to the search form, then with the input from the form you pass it back to debounce so it can hand it over to the handleSearch method then wait the desired amount of time before running
    const debounce = _.debounce(term => {
        this.handleSearch(term)
    }, 500)
    
    return (
        <div>
              <span style={{float: 'right'}}>{localStorage.user_name}</span><br/>
              <span style={{float: 'right'}}>{localStorage.user_email}</span>
        <div>
        <button onClick={() => this.props.logOut(this.props.history)}>Logout</button>

        
        </div>
        {this.state.showMatches 
            ? 
      
            <div>
                  <button onClick={this.changeView}>Home</button>
            <Matches matchedrestaurants={this.state.matchedrestaurants} deleteMatch={this.deleteMatch} />
            </div> 
        : 
       
        <div>
             <button onClick={this.changeView}>Matches</button>
        <SearchForm handleSearch={debounce}/>
        <PriceForm priceFilter={this.priceFilter}/>
      {this.state.isLoading ?  <h1 className="Header">Dine or Diss!</h1> : <h1>Loading...</h1>}
        <RestaurantList restaurants={this.state.restaurants} info={this.sendToDetail} sendToMatch={this.sendToMatch}/>  
    </div>
        }
              
        </div>

    );
  }
}

export default YelpContainer;

import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "./constants";




const config = {
    method: 'GET',
    headers: {'Authorization': `Bearer ${API_KEY}`},
    params: {
        term: 'burgers',
        location: '708 main st'
    }
}

export class YelpContainer extends Component {


  componentDidMount(){

      axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
      .then(res => console.log(res))
  }

  

  render() {
    return (
      <div>
        <h1>Yelp API first request</h1>
      </div>
    );
  }
}

export default YelpContainer;

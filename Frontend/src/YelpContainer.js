import React, { Component } from 'react';
import axios from 'axios';

const config = {
    headers: `Bearer ${process.env.YELP_API_KEY}`,
    params: {
        term: 'burgers',

    }
    

}

export class YelpContainer extends Component {


    componentDidMount(){
        axios.get('https://api.yelp.com/v3/businesses/search', config)
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
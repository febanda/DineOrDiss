import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "../constants";
import { Image } from "semantic-ui-react";

// console.log(this.props.location.state)

export class RestaurantPage extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      isLoading: false,
      reviews: []
    };
  }

  componentDidMount = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    };
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${
          this.props.location.state.id
        }`,
        config
      )
      .then(restaurant => {
        this.setState({
          restaurant: restaurant,
          isLoading: true
        });
      });
  };

  getReviews = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    };

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${
          this.props.location.state.id
        }/reviews`,
        config
      )
      .then(reviews => {
        this.setState({
          reviews: reviews
        });
      })
      // .then(console.log(this.state.reviews));
  };

  render() {
    let restaurant = this.state.restaurant.data;
    console.log(restaurant);

    // const photos = restaurant.photos
    // const allPhotos = photos.map(photo => {
    //   return photo
    // })

    return (
      <div>
        {this.state.isLoading ? (
          <div>
            <h1>{restaurant.name}</h1>
            <Image src={restaurant.photos[0]} width="200" />
            <Image src={restaurant.photos[1]} width="200" />
            <Image src={restaurant.photos[2]} width="200" />
            <p>{restaurant.display_phone}</p>
            <p>Total Reviews: {restaurant.review_count}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Location: {restaurant.location["display_address"]}</p>
            <p>Price: {restaurant.price}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

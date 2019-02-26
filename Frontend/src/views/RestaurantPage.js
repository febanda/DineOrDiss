import React, { Component } from "react";
// import { Card, Icon, Image } from 'semantic-ui-react'

export class RestaurantPage extends Component {
  render() {
      console.log(this.props)
      const {name} = this.props.location.state
      const {image} = this.props.location.state
      const {phone} = this.props.location.state
      const {address} = this.props.location.state
      const {link} = this.props.location.state
    return (
      <div>
        <h1>{name}</h1>
        <img src={image} width="400"></img>
        <p>{phone}</p>
        <p>{address}</p>
        <p>{link}</p>
      </div>
    );
  }
}

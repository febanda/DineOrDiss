import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router';

import { Login } from './views/Login';
import { SignUp } from './views/SignUp';
import {RestaurantPage} from './views/RestaurantPage'
import {Matches} from './views/Matches'
import YelpContainer from './YelpContainer';
import {API_URL} from './constants';
import axios from "axios";








class App extends Component {


  state = {
    // matches: [],
    // matchedRestaurants: [],
    token: localStorage.getItem('token'),
    user_id: localStorage.getItem('user_id'),
    user: JSON.parse(localStorage.getItem('user')) || {}
  }


  setUserInState = (token, user, user_id) => {

    localStorage.setItem('token', token)
    localStorage.setItem('user_id', user_id)
    localStorage.setItem('user', JSON.stringify(user))

    this.setState({token, user, user_id})
  }

  logout = (history) => {
  
    console.log('h')
    localStorage.clear()
    this.setState({token: null, user: null})
    history.push('/login')
   
    
  }



// deleteMatch = (restaurant) => {

//   let match = this.state.matches.find(match => {
//       return match.user_id === this.state.user_id && match.business_id == restaurant.id 
//   })
  
//   let axiosConfig = {
//       headers: {
//           'Content-Type':'application/json',
//           'Authorization': `Bearer ${localStorage.token}`
//       }
//   }
//   axios.delete(`${API_URL}/matches/${match.id}`, axiosConfig)
// }

  // sendToYelpContainer = (matchedRestaurants, matches) => {
  //  this.setState({
  //   matchedRestaurants: matchedRestaurants,
  //   matches: matches
  //  })
    
  // }


  render() {
    // const {name} = this.state.user
    return (
      <div>
        {/* {(localStorage.length > 0)
        ? <span style={{float:'right'}}>
        {name}
      </span>
      : null} */}
     
      <BrowserRouter>
      <Switch>
        <Route path="/users/:id" render= {props => <YelpContainer {...props} logOut={this.logout} test={this.sendToYelpContainer} /> } />
        <Route path="/login" render={props => <Login {...props} onLogin={this.setUserInState}/>}/>
        <Route path="/signup" render={ props => <SignUp {...props} onSignUp={this.setUserInState} />}/>
        <Route path="/restaurantpage" component={RestaurantPage} />
        {/* <Route path="/matches" render= {props => <Matches {...props} matchedrestaurants={this.state.matchedRestaurants} deleteMatch={this.deleteMatch}/>} /> */}
        <Route path="/" render={ () => <Redirect to="/login" />}/>
       
      </Switch>
    </BrowserRouter>
    </div>
    );
  }
}

export default App;

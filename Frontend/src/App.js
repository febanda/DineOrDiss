import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router';
import { UserDisplay } from './views/UserDisplay';
import { Login } from './views/Login';
import { SignUp } from './views/SignUp';
import {RestaurantPage} from './views/RestaurantPage'
import {Matches} from './views/Matches'
import YelpContainer from './YelpContainer';






class App extends Component {


  state = {
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
        <Route path="/users/:id" render= {props => <YelpContainer {...props} logOut={this.logout} /> } />
        <Route path="/login" render={props => <Login {...props} onLogin={this.setUserInState}/>}/>
        <Route path="/signup" render={ props => <SignUp {...props} onSignUp={this.setUserInState} />}/>
        <Route path="/restaurantpage" component={RestaurantPage} />
        <Route path="/matches" component={Matches} />
        <Route path="/" render={ () => <Redirect to="/login" />}/>
       
      </Switch>
    </BrowserRouter>
    </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router';
import { UserList } from './views/UserList';
import { UserDisplay } from './views/UserDisplay';
import { Login } from './views/Login';
import { SignUp } from './views/SignUp';





class App extends Component {


  state = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || {}
  }


  setUserInState = (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.setState({token, user})
  }

  logout = () => {
    console.log('h')
    localStorage.clear()
    this.setState({token: null, user: null})
    this.state.history.push('/login')
  }

  render() {
    const {name} = this.state.user
    return (
      <div>
      <span style={{float:'right'}}>
        {name}
      </span>
      <BrowserRouter>
      <Switch>
        <Route path="/users/:id" component={UserDisplay} logOut={this.logout} />
        <Route path="/login" render={props => <Login {...props} onLogin={this.setUserInState}/>}/>
        <Route path="/signup" render={ props => <SignUp {...props} onSignUp={this.setUserInState} />}/>
        <Route path="/" render={ () => <Redirect to="/login" />}/>
      </Switch>
    </BrowserRouter>
    </div>
    );
  }
}

export default App;

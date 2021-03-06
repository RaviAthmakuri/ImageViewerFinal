import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import Profile from '../screens/Profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {
  
    render() {
      return (
        <Router>
          <div className="main-container">
      <Route exact path='/' render={(props)=><Login  {...props}></Login>}/>
      <Route exact path='/home' render={(props)=><Home  {...props}></Home>} />
      <Route exact path='/profile' render={(props)=><Profile  {...props}></Profile>} />
          </div>
        </Router>
      )
    }
  }
  
  export default Controller;
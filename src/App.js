import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Router exct path="/" Component={ Login } />
          <Router exct path="/carteira" Component={ Wallet } />
        </Switch>
      </div>
    );
  }
}

export default App;

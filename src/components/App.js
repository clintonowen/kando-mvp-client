import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import LoginForm from './login-form';

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default App;

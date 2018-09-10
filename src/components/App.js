import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
      </div>
    );
  }
}

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import Board from './board';
import WindowDimensions from './window-dimensions';
import { refreshAuthToken } from '../actions/auth';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000
    );
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }
  render() {
    return (
      <div id="app">
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/board" component={Board} />
        <WindowDimensions />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(App));

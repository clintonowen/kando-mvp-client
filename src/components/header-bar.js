import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  showNavMenu,
  hideNavMenu
} from '../actions/activity';
import './header-bar.css';

export class HeaderBar extends React.Component {
  toggleMenu() {
    if (this.props.showNavMenu) {
      this.props.dispatch(hideNavMenu());
    } else {
      this.props.dispatch(showNavMenu());
    }
  }

  hideMenu() {
    this.props.dispatch(hideNavMenu());
  }

  render() {
    const responsive = this.props.showNavMenu ? 'responsive' : '';
    return (
      <nav>
        <header>
          <h1>KanDo</h1>
        </header>
        <ul className={responsive}>
          <li className="menu-icon">
            <button onClick={() => this.toggleMenu()}>
            Menu
            </button>
          </li>
          <li>
            <Link to="/" onClick={() => this.hideMenu()}>Home</Link>
          </li>
          <li>
            <Link to="/login" onClick={() => this.hideMenu()}>Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  showNavMenu: state.activity.showNavMenu
});

export default withRouter(connect(mapStateToProps)(HeaderBar));

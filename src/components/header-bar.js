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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  showNavMenu: state.showNavMenu
});

export default withRouter(connect(mapStateToProps)(HeaderBar));

import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { showNavMenu, hideNavMenu } from '../actions/activity';
import { setTimerColumn, unsetTimerColumn } from '../actions/board-data';
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
  toggleTimer() {
    let timerColumn = this.props.columns.find(column => column.showTimer === true);
    if (!timerColumn) {
      let timerColumn = this.props.columns[this.props.columns.length - 1]['id'];
      this.props.dispatch(setTimerColumn(timerColumn));
      this.hideMenu();
    } else {
      this.props.dispatch(unsetTimerColumn());
      this.hideMenu();
    }
  }
  handleLogOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  render() {
    const responsive = this.props.showNavMenu ? 'responsive' : '';
    let navLinks = (
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
    );
    if (this.props.location.pathname === '/board') {
      navLinks = (
        <ul className={responsive}>
          <li className="menu-icon">
            <button onClick={() => this.toggleMenu()}>
              Menu
            </button>
          </li>
          <li>
            <a href="#app" onClick={() => this.toggleTimer()}>Timer</a>
          </li>
          <li>
            <a href="#app" onClick={() => this.handleLogOut()}>Log out</a>
          </li>
        </ul>
      );
    }
    
    return (
      <nav>
        <header>
          <h1>KanDo</h1>
        </header>
        {navLinks}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  showNavMenu: state.activity.showNavMenu,
  columns: state.boardData.columns
});

export default withRouter(connect(mapStateToProps)(HeaderBar));

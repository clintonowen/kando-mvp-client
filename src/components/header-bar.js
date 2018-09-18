import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { showNavMenu, hideNavMenu } from '../actions/activity';
import { setTimerColumn, unsetTimerColumn } from '../actions/board-data';
import { DropdownMenu } from './dropdown-menu';
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
    let columns = this.props.columns;
    let timerColumn = columns.find(column => column.showTimer === true);
    if (columns.length > 0 && !timerColumn) {
      let timerColumn = this.props.columns[this.props.columns.length - 1]['id'];
      this.props.dispatch(setTimerColumn(timerColumn));
      this.hideMenu();
    } else {
      this.props.dispatch(unsetTimerColumn());
      this.hideMenu();
    }
  }
  handleLogOut() {
    this.hideMenu();
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  render() {
    let links = (this.props.location.pathname === '/board')
      ? [
        {
          onClick: () => this.toggleTimer(),
          text: 'Timer',
          href: "#app"
        },
        {
          onClick: () => this.handleLogOut(),
          text: 'Log out',
          href: "#app"
        }
      ]
      : [
        {
          onClick: () => this.hideMenu(),
          text: 'Home',
          href: "/"
        },
        {
          onClick: () => this.hideMenu(),
          text: 'Login',
          href: "/login"
        }
      ];
    
    return (
      <nav>
        <header>
          <h1>KanDo</h1>
        </header>
        <MediaQuery minWidth={701}>
          <ul className="desktop-links">
            {links.map((link, i) => {
              return (
                <li key={`navlinks-${i}`}>
                  <Link to={link.href} onClick={() => link.onClick()}>
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </MediaQuery>
        <MediaQuery maxWidth={700}>
          <DropdownMenu
            classes="nav-menu"
            showMenu={this.props.showNavMenu}
            toggleMenu={() => this.toggleMenu()}
            links={links}
          />
        </MediaQuery>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  showNavMenu: state.activity.showNavMenu,
  columns: state.boardData.columns
});

export default withRouter(connect(mapStateToProps)(HeaderBar));

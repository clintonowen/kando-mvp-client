import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import MediaQuery from 'react-responsive';
import { clearAuth } from '../actions/auth';
import { deleteUser } from '../actions/users';
import { clearAuthToken } from '../local-storage';
import { showNavMenu, hideNavMenu } from '../actions/activity';
import { setTimerColumn, unsetTimerColumn } from '../actions/board-data';
// import { DropdownMenu } from './dropdown-menu';
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
    if (this.props.user.username.slice(0,5) === 'd3m0-') {
      this.props.dispatch(deleteUser());
    }
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
          href: "/",
          isLink: true
        },
        {
          onClick: () => this.hideMenu(),
          text: 'Login',
          href: "/login",
          isLink: true
        }
      ];
    
    return (
      <header role="banner" className="banner">
        <h1>
          <Link to="/" onClick={() => this.hideMenu()}>KanDo</Link>
        </h1>
        <nav>
          {/* <MediaQuery minWidth={700}> */}
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
          {/* </MediaQuery> */}
          {/* <MediaQuery maxWidth={699}>
            <DropdownMenu
              classes="nav-menu"
              showMenu={this.props.showNavMenu}
              toggleMenu={() => this.toggleMenu()}
              links={links}
            />
          </MediaQuery> */}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  showNavMenu: state.activity.showNavMenu,
  columns: state.boardData.columns,
  user: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(HeaderBar));

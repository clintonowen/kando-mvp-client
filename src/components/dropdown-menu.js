import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { makeId } from '../actions/utils';
import './dropdown-menu.css';

export class DropdownMenu extends React.Component {
  render() {
    const menu = (this.props.showMenu && this.props.links)
      ? (
        <div className="menu">
          <ul>
            {this.props.links.map((link) => {
              if (link.isLink) {
                return (
                  <li key={makeId()}>
                    <Link to={link.href} onClick={() => link.onClick()}>
                      {link.text}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={makeId()}>
                    <a href={link.href} onClick={() => link.onClick()}>
                      {link.text}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )
      : (null);
    return (
      <div aria-hidden={this.props.ariaHidden} className={`menu-container ${this.props.classes}`}>
        <button aria-label="menu" label="menu" className="menu-icon" onClick={() => this.props.toggleMenu()}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div aria-live="polite" aria-atomic="true" aria-relevant="additions">
          {menu}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps)(DropdownMenu));

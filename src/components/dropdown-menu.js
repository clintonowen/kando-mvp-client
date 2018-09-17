import React from 'react';
import { connect } from 'react-redux';
import './dropdown-menu.css';

export class DropdownMenu extends React.Component {
  render() {
    const menu = (this.props.showMenu && this.props.links)
      ? (
        <div className="menu">
          <ul>
            {this.props.links.map((link, i) => {
              return (
                <li index={i}>
                  <a href="#app" onClick={() => link.onClick()}>
                    {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )
      : (null);
    return (
      <div className="menu-container">
        <button className="menu-icon" onClick={() => this.props.toggleMenu()}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        {menu}
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(DropdownMenu);

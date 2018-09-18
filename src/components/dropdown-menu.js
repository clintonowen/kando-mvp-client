import React from 'react';
import { connect } from 'react-redux';
import './dropdown-menu.css';

export class DropdownMenu extends React.Component {
  makeId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 24; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  render() {
    const menu = (this.props.showMenu && this.props.links)
      ? (
        <div className="menu">
          <ul>
            {this.props.links.map((link) => {
              return (
                <li key={this.makeId()}>
                  <a href={link.href} onClick={() => link.onClick()}>
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
      <div className={`menu-container ${this.props.classes}`}>
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

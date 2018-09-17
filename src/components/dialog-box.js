import React from 'react';
import { connect } from 'react-redux';

export class DialogBox extends React.Component {
  render() {
    return (
      <div className={this.props.classes}></div>
    );
  }
}

export const mapStateToProps = (state, props) => ({

});

export default connect(mapStateToProps)(DialogBox);

import React from 'react';
import {connect} from 'react-redux';
// import Column from './column';

export class Board extends React.Component {
  render() {
    return (
      <div className="board">
        {/* <Column /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(Board);

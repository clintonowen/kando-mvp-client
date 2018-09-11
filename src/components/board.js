import React from 'react';
import {connect} from 'react-redux';
import Column from './column';
import './board.css';

export class Board extends React.Component {
  render() {

    return (
      <div className="board-wrapper">
        <main className="board">
          <Column />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(Board);

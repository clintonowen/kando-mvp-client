import React from 'react';
import {connect} from 'react-redux';
// import {fetchColumns} from '../actions/board-data';
import Column from './column';
import './board.css';

export class Board extends React.Component {
  componentDidMount() {
    // return this.props.dispatch(fetchColumns());
  }

  render() {
    if (this.props.columns) {

    }
    return (
      <div className="board-wrapper">
        <main className="board">
          <Column columnId="111111111111111111111101"/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // columns: state.boardData.columns
});

export default connect(mapStateToProps)(Board);

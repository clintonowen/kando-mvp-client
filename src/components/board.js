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
    let dimOverlay;
    if (this.props.selectStatus === 'started') {
      dimOverlay = <div className="dim-overlay"></div>
    }
    return (
      <div className="board-wrapper">
        {dimOverlay}
        <main className="board">
          <Column columnId="111111111111111111111101"/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // columns: state.boardData.columns
  selectStatus: state.timer.selectStatus
});

export default connect(mapStateToProps)(Board);

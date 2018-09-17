import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import requiresLogin from './requires-login';
import { fetchColumns } from '../actions/board-data';
import Column from './column';
import './board.css';

export class Board extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchColumns());
  }

  render() {
    let columns;
    if (this.props.columns.length > 0) {
      columns = this.props.columns
        .map(column => {
          return (
            <Column
              key={column.id}
              id={column.id}
              name={column.name}
              tasks={column.tasks}
              showTimer={column.showTimer}
              showTaskForm={column.showTaskForm}
            />
          );
        });
    }
    let dimOverlay;
    if (this.props.selectStatus === 'started') {
      dimOverlay = <div className="dim-overlay"></div>
    }
    return (
      <div className="board-wrapper">
        {dimOverlay}
        <main className="board">
          <div className="left-center-columns"></div>
          {columns}
          <div className="right-center-columns"></div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.boardData.columns,
  selectStatus: state.timer.selectStatus
});

export default requiresLogin()(
  connect(mapStateToProps)(
    DragDropContext(HTML5Backend)(Board))
);

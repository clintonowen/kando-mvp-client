import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import moment from 'moment';
import { updateColumn } from '../actions/board-data';
import { selectTask, stopSelect } from '../actions/timer';
import './task.css';

export class Task extends React.Component {
  handleTaskClick(taskId) {
    if (this.props.selectStatus === 'started') {
      this.props.dispatch(selectTask(taskId));
      this.props.dispatch(stopSelect());
    }
  }
  handleUpdateColumn(columnId, updateData) {
    this.props.dispatch(updateColumn(columnId, updateData));
  }
  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    let timeSpent;
    let containerClasses = 'task-container'
    let taskClasses = 'task';
    if (this.props.selected === true) {
      containerClasses += ' selected';
    }
    if (this.props.selectStatus === 'started') {
      containerClasses += ' selectable';
    }
    if (isDragging) {
      containerClasses += ' dragged-border';
      taskClasses += ' dragged-content';
    }
    if (this.props.time) {
      let duration;
      const time = moment.duration(this.props.time);
      const hours = Math.floor(time.asHours());
      const minutes = Math.floor(time.asMinutes()) - hours * 60;
      if (hours > 0) {
        duration = `${hours}h ${minutes}m`;
      } else {
        duration = `${minutes}m`;
      }
      timeSpent = <span>Time spent: {duration}</span>
    }
    return connectDragSource(connectDropTarget(
      <div
          id={this.props.taskId}
          index={this.props.index}
          className={containerClasses}
          columnid={this.props.columnid}
          onClick={() => this.handleTaskClick(this.props.taskId)}
      >
        <section className={taskClasses}>
          <header>{this.props.name}</header>
          {timeSpent}
        </section>
      </div>
    ));
  }
}

const taskSource = {
  beginDrag(props) {
    return {
      index: props.index,
      columnId: props.columnId,
      task: props.task
    };
  },
  endDrag(props, monitor){
    const sourceColumn = props.columnId;
    const targetColumn = monitor.getDropResult().columnId;
    const columns = monitor.getDropResult().columns;
    const sourceData = {
      tasks: columns.find(column => column.id === sourceColumn)
        .tasks.map(task => task.id)
    };
    props.dispatch(updateColumn(sourceColumn, sourceData));
    if (targetColumn !== sourceColumn) {
      const targetData = {
        tasks: columns.find(column => column.id === targetColumn)
          .tasks.map(task => task.id)
      };
      props.dispatch(updateColumn(targetColumn, targetData));
    }
  },
  isDragging(props, monitor) {
    return props.task.id === monitor.getItem().task.id;
  }
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if (dragIndex !== hoverIndex) {
      props.moveTask(monitor.getItem().task, dragIndex, hoverIndex, props.columnId);

      // Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  }
};

const mapStateToProps = state => ({
  selectStatus: state.timer.selectStatus,
  columns: state.boardData.columns
});

export default connect(mapStateToProps)(
  DropTarget(
  "TASK", taskTarget, connect => ({
    connectDropTarget: connect.dropTarget()
    })
  )(DragSource(
  "TASK", taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
    })
  )(Task)));

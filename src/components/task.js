import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { selectTask, stopSelect } from '../actions/timer';
import { removeColumnTask, addColumnTask, toggleTaskDragging, setSourceColumn, setTargetColumn, setDragElement, setOverElement, setNodePlacement } from '../actions/board-data';
import './task.css';

export class Task extends React.Component {
  handleTaskClick(taskId) {
    if (this.props.selectStatus === 'started') {
      this.props.dispatch(selectTask(taskId));
      this.props.dispatch(stopSelect());
    }
  }
  handleDragStart(event) {
    this.props.dispatch(setDragElement(event.target));
    this.props.dispatch(setSourceColumn(
      this.props.columns.find(col => col.id === this.props.columnId)
    ));
    // this.props.dispatch(removeColumnTask());
    setTimeout(() => {
      this.props.dispatch(toggleTaskDragging(this.props.dragElement.id));
    }, 1);
  }
  handleDragEnd(event) {
    console.log('handleDragEnd ran');
    // this.props.dispatch(toggleTaskDragging(this.props.dragElement.id));
    // let domTask = document.getElementById(this.props.dragElement.id);
    // console.log('domTask', domTask);
    // this.props.overElement.parentNode.removeChild(domTask);
  }
  handleDragOver(event) {
    event.preventDefault();
    if (event.currentTarget.id !== this.props.dragElement.id) {
      this.props.dispatch(setOverElement(event.currentTarget));
      this.props.dispatch(setTargetColumn(
        this.props.columns.find(col => col.id === this.props.columnId)
      ));
    }
    const over = this.props.overElement;
    if (over) {
      const relY = event.clientY - over.offsetTop;
      const height = over.offsetHeight / 2;
      const parent = over.parentNode;
      if (relY > height) {
        this.props.dispatch(setNodePlacement("after"));
        // this.props.dispatch(addColumnTask());
        parent.insertBefore(this.props.dragElement, over.nextElementSibling);
      }
      if (relY < height) {
        this.props.dispatch(setNodePlacement("before"));
        parent.insertBefore(this.props.dragElement, over);
      }
    }
    if (this.props.targetColumn) {
      // this.props.dispatch(addColumnTask());
    }
  }
  render() {
    let timeSpent;
    let containerClasses = 'task-container'
    let taskClasses = 'task';
    if (this.props.selected === true) {
      containerClasses += ' selected';
    }
    if (this.props.selectStatus === 'started') {
      containerClasses += ' selectable';
    }
    if (this.props.dragging === true) {
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
    return (
      <div
          id={this.props.taskId}
          index={this.props.index}
          className={containerClasses}
          columnid={this.props.columnid}
          onClick={() => this.handleTaskClick(this.props.taskId)}
          draggable="true"
          onDragStart={(e) => this.handleDragStart(e)}
          onDragEnd={(e) => {
            console.log('launching handleDragEnd');
            this.handleDragEnd(e);
          }}
          onDragOver={(e) => this.handleDragOver(e)}
      >
        <section className={taskClasses}>
          <header>{this.props.name}</header>
          {timeSpent}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectStatus: state.timer.selectStatus,
  columns: state.boardData.columns,
  targetColumn: state.boardData.targetColumn,
  dragElement: state.boardData.dragElement,
  overElement: state.boardData.overElement
});

export default connect(mapStateToProps)(Task);

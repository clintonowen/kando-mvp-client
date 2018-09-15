import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { selectTask, stopSelect } from '../actions/timer';
import { /* toggleTaskDragging */ } from '../actions/board-data';
import './task.css';

export class Task extends React.Component {
  handleTaskClick(taskId) {
    if (this.props.selectStatus === 'started') {
      this.props.dispatch(selectTask(taskId));
      this.props.dispatch(stopSelect());
    }
  }
  handleDragStart(event) {
    event.persist();
    event.dataTransfer.setData("number", event.target.id);
    // this.props.dispatch(toggleTaskDragging(event.target.id));
    setTimeout(function() {
      Object.assign(event.target.style, {
        background: "none",
        border: "3px dashed gray",
        margin: "6px",
        padding: "2px"
      });
      event.target.children[0].style.visibility = "hidden";
    }, 1);
  }
  handleDragEnd(event) {
    event.persist();
    // this.props.dispatch(toggleTaskDragging(event.target.id));
    setTimeout(function() {
      Object.assign(event.target.style, {
        background: "lightgray",
        border: "",
        margin: "",
        padding: ""
      });
      event.target.children[0].style.visibility = "";
    }, 1);
  }
  render() {
    let timeSpent;
    let classes = 'task';
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
    if (this.props.selected === true) {
      classes += ' selected';
    }
    if (this.props.selectStatus === 'started') {
      classes += ' bright';
    }
    if (this.props.dragging === true) {
      classes += ' dragging';
    }
    return (
      <div
          id={this.props.taskId}
          className="task-container"
          onClick={() => this.handleTaskClick(this.props.taskId)}
          draggable="true"
          onDragStart={(e) => this.handleDragStart(e)}
          onDragEnd={(e) => this.handleDragEnd(e)}
      >
        <section className={classes}>
          <header>{this.props.name}</header>
          {timeSpent}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectStatus: state.timer.selectStatus
});

export default connect(mapStateToProps)(Task);

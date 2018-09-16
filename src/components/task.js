import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { selectTask, stopSelect } from '../actions/timer';
import { setDragElement, setOverElement } from '../actions/board-data';
import './task.css';

export class Task extends React.Component {
  handleTaskClick(taskId) {
    if (this.props.selectStatus === 'started') {
      this.props.dispatch(selectTask(taskId));
      this.props.dispatch(stopSelect());
    }
  }
  handleDragStart(event) {
    const dragged = event.target;
    // dragged.classList.remove('task-container');
    // console.log('dragged', dragged);
    event.dataTransfer.setData("text/html", event.currentTarget);
    setTimeout(() => {
      Object.assign(dragged.style, {
        background: "none",
        border: "3px dashed gray",
        margin: "6px",
        marginBottom: "0px",
        padding: "2px",
        pointerEvents: "none"
      });
      dragged.children[0].style.visibility = "hidden";
    }, 1);
    this.props.dispatch(setDragElement(dragged));
  }
  handleDragEnd(event) {
    setTimeout(() => {
      Object.assign(this.props.dragElement.style, {
        background: "lightgray",
        border: "",
        margin: "",
        padding: "",
        pointerEvents: ""
      });
      this.props.dragElement.children[0].style.visibility = "";
    }, 1);
    
  }
  handleDragOver(event) {
    event.preventDefault();
    const over = event.currentTarget;
    const relY = event.clientY - over.offsetTop;
    const height = over.offsetHeight / 2;
    const parent = over.parentNode;
    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(this.props.dragElement, over.nextElementSibling);
    }
    if (relY < height) {
      this.nodePlacement = "before";
      parent.insertBefore(this.props.dragElement, over);
    }
    if (over.id !== this.props.dragElement.id) {
      this.props.dispatch(setOverElement(over, this.nodePlacement));
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
      taskClasses += ' dragging';
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
          onDragEnd={(e) => this.handleDragEnd(e)}
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
  dragElement: state.boardData.dragElement,
  overElement: state.boardData.overElement
});

export default connect(mapStateToProps)(Task);

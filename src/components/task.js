import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { selectTask, stopSelect } from '../actions/timer';
import './task.css';

export class Task extends React.Component {
  handleTaskClick(taskId) {
    if (this.props.selectStatus === 'started') {
      this.props.dispatch(selectTask(taskId));
      this.props.dispatch(stopSelect());
    }
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
      classes += ' bright'
    }
    return (
      <section
        className={classes}
        onClick={() => this.handleTaskClick(this.props.taskId)}
      >
        <header>{this.props.name}</header>
        {timeSpent}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  selectStatus: state.timer.selectStatus
});

export default connect(mapStateToProps)(Task);

import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { startTimer, stopTimer, resetTimer, timerTick } from '../actions/timer';
import { updateTime, sendTime } from '../actions/board-data';
import './timer.css';

export class Timer extends React.Component {
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  handleClickStart() {
    this.timerInterval = setInterval(() => {
      this.props.dispatch(timerTick());
      if (this.props.timeElapsed % 60000 === 0) {
        this.props.dispatch(updateTime(this.props.selectedTask));
        this.props.dispatch(sendTime(this.props.selectedTask, this.props.tasks));
      }
    }, 1000);
    this.props.dispatch(startTimer());
  }
  handleClickStop() {
    clearInterval(this.timerInterval);
    this.props.dispatch(stopTimer());
  }
  handleReset() {
    this.props.dispatch(resetTimer());
  }
  render() {
    let timeLeft = moment(this.props.timeLeft).format('mm:ss');

    let timerButton = (this.props.timerStatus === 'started') ?
      <button onClick={() => this.handleClickStop()}>Stop</button> :
      <button onClick={() => this.handleClickStart()}>Start</button>;

    let taskName;
    if (this.props.tasks) {
      taskName = this.props.tasks
        .filter(task => task.id === this.props.selectedTask)[0]['name'];
    }

    let taskStyle = {color: 'maroon'};

    return (
      <section className="timer">
        <header>Pomodoro Timer</header>
        <button>Select a task</button>
        <p className="task-selected">Task Selected: <span style={taskStyle}>{taskName ? taskName : 'None'}</span></p>
        <p className="time-left">{timeLeft}</p>
        {timerButton}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  timeLeft: state.timer.timeLeft,
  timeElapsed: state.timer.timeElapsed,
  timerStatus: state.timer.timerStatus,
  selectedTask: state.timer.selectedTask,
  tasks: state.boardData.tasks
});

export default connect(mapStateToProps)(Timer);

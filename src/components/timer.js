import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { startTimer, stopTimer, timerTick, startSelect, stopSelect, 
  showTimerMenu, hideTimerMenu, breakTime, startBreak } from '../actions/timer';
import { updateTime, sendTime, unsetTimerColumn } from '../actions/board-data';
import './timer.css';

export class Timer extends React.Component {
  componentWillUnmount() {
    this.handleClearTimers();
  }
  handleStartTimer() {
    this.handleClearTimers();
    this.props.dispatch(startTimer());
    this.timerInterval = setInterval(() => {
      this.props.dispatch(timerTick());
      if (this.props.timeElapsed % 60000 === 0) {
        this.props.dispatch(updateTime(this.props.selectedTask));
        this.props.dispatch(sendTime(this.props.selectedTask, this.props.tasks));
        if (this.props.timeLeft <= 0) {
          this.handleClearTimers();
          this.handleBreaktime();
        }
      }
    }, 10);
  }
  handleBreaktime() {
    this.props.dispatch(breakTime());
  }
  handleStartBreak() {
    this.handleClearTimers();
    this.props.dispatch(startBreak());
    this.breakInterval = setInterval(() => {
      this.props.dispatch(timerTick());
      if (this.props.timeLeft <= 0) {
        this.handleClearTimers();
      }
    }, 5);
  }
  handleClearTimers() {
    clearInterval(this.timerInterval);
    clearInterval(this.breakInterval);
  }
  handleStopTimer() {
    this.handleClearTimers();
    this.props.dispatch(stopTimer());
  }
  handleStartSelect() {
    this.props.dispatch(startSelect());
  }
  handleStopSelect() {
    this.props.dispatch(stopSelect());
  }
  toggleMenu() {
    if (this.props.showTimerMenu) {
      this.props.dispatch(hideTimerMenu());
    } else {
      this.props.dispatch(showTimerMenu());
    }
  }
  hideTimer() {
    this.props.dispatch(unsetTimerColumn());
    this.props.dispatch(hideTimerMenu());
  }
  render() {
    let timeLeft = moment(this.props.timeLeft).format('mm:ss');

    let selectButton = <button
        className="select-button"
        onClick={() => this.handleStartSelect()}
      >Select a task</button>
    if (this.props.selectStatus === 'started') {
      selectButton = <button
          className="select-button"
          onClick={() => this.handleStopSelect()}
        >Cancel</button>
    } else if (this.props.selectedTask) {
      selectButton = <button
          className="select-button"
          onClick={() => this.handleStartSelect()}
        >Change task</button>;
    }

    let timerButton = <button disabled>Start</button>
    if (this.props.selectedTask && (this.props.timerStatus === 'stopped' || this.props.timerStatus === 'onBreak')) {
      timerButton = <button onClick={() => this.handleStartTimer()}>Start</button>;
    } else if (this.props.selectedTask && (this.props.timerStatus === 'started' || this.props.timerStatus === 'onBreak')) {
      timerButton = <button onClick={() => this.handleStopTimer()}>Stop</button>
    } else if (this.props.timerStatus === 'breakTime') {
      timerButton = <button onClick={() => this.handleStartBreak()}>Break</button>
    }

    let taskName;
    if (this.props.tasks && this.props.selectedTask) {
      taskName = this.props.tasks
        .filter(task => task.id === this.props.selectedTask)[0]['name'];
    }

    const responsive = this.props.showTimerMenu ? 'responsive' : '';

    return (
      <section className="timer">
        <header>
          Pomodoro Timer
          <ul className={responsive}>
            <li className="menu-icon">
              <button onClick={() => this.toggleMenu()}>
                Menu
              </button>
            </li>
            <li>
              <a href="#app" onClick={() => this.hideTimer()}>Hide</a>
            </li>
          </ul>
          
        </header>
        {selectButton}
        <p className="task-selected">
          Task Selected: <span
            style={{color: 'maroon'}}> {taskName ? taskName : 'None'}
            </span>
        </p>
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
  selectStatus: state.timer.selectStatus,
  selectedTask: state.timer.selectedTask,
  tasks: state.boardData.tasks,
  showTimerMenu: state.timer.showTimerMenu
});

export default connect(mapStateToProps)(Timer);

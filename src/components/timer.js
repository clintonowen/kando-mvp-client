import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { startTimer, stopTimer, resetTimer, timerTick, startSelect, stopSelect, showTimerMenu, hideTimerMenu } from '../actions/timer';
import { updateTime, sendTime, unsetTimerColumn } from '../actions/board-data';
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
    }, 50);
    this.props.dispatch(startTimer());
  }
  handleClickStop() {
    clearInterval(this.timerInterval);
    this.props.dispatch(stopTimer());
  }
  handleReset() {
    this.props.dispatch(resetTimer());
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
    if (this.props.selectedTask && this.props.timerStatus === 'stopped') {
      timerButton = <button onClick={() => this.handleClickStart()}>Start</button>;
    } else if (this.props.selectedTask && this.props.timerStatus === 'started') {
      timerButton = <button onClick={() => this.handleClickStop()}>Stop</button>
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
        <p className="task-selected">Task Selected: <span style={{color: 'maroon'}}>{taskName ? taskName : 'None'}</span></p>
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
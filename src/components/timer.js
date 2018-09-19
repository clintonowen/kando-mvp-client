import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { startTimer, stopTimer, timerTick, startSelect, stopSelect, 
  showTimerMenu, hideTimerMenu, breakTime, startBreak } from '../actions/timer';
import { updateTime, updateTask, unsetTimerColumn } from '../actions/board-data';
import { DropdownMenu } from './dropdown-menu';
import './timer.css';

export class Timer extends React.Component {
  componentDidMount() {
    this.handleOverflow();
  }
  componentDidUpdate() {
    this.handleOverflow();
  }
  componentWillUnmount() {
    this.handleClearTimers();
  }
  handleOverflow() {
    const timerColumn = document.getElementsByClassName('timer')[0].parentElement;
    if (timerColumn.scrollHeight > timerColumn.clientHeight) {
      this.hideTimer();
    }
  }
  handleStartTimer() {
    this.handleClearTimers();
    this.props.dispatch(startTimer());
    this.timerInterval = setInterval(() => {
      this.props.dispatch(timerTick());
      if (this.props.timeElapsed % 60000 === 0) {
        this.props.dispatch(updateTime(this.props.selectedTask));
        let newTime;
        this.props.columns.forEach(column => {
          let task = column.tasks.filter(task => task.id === this.props.selectedTask);
          if (task.length > 0) {
            newTime = task[0]['time'];
          }
        });
        this.props.dispatch(updateTask(this.props.selectedTask, { time: newTime }));
        if (this.props.timeLeft <= 0) {
          this.handleClearTimers();
          this.handleBreaktime();
        }
      }
    }, 20);
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
    }, 20);
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

    const allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      if (allElements[i].className !== 'select-task'
        && allElements[i].className !== 'select-button'
        && allElements[i].className !== 'col-header') {
        allElements[i].tabIndex = -1;
        // allElements[i].setAttribute('aria-hidden', 'true');
      } else {
        allElements[i].tabIndex = 1;
        // allElements[i].setAttribute('aria-hidden', 'false');
      }
    }
  }
  handleStopSelect() {
    this.props.dispatch(stopSelect());

    const allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      if (allElements[i].className === 'select-task') {
        allElements[i].tabIndex = -1;
      } else {
        allElements[i].removeAttribute('tabIndex');
        // allElements[i].removeAttribute('aria-hidden');
      }
    }
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
    const ariaHidden = (this.props.selectStatus === 'started') ? true : false;
    let timeLeft = moment(this.props.timeLeft).format('mm:ss');

    let selectButton = <button
        className="select-button"
        onClick={() => this.handleStartSelect()}>
          Select a task
        </button>
    if (this.props.selectStatus === 'started') {
      selectButton = <button
          aria-label="Cancel select task"
          className="select-button"
          onClick={() => this.handleStopSelect()}>
            Cancel
          </button>
    } else if (this.props.selectedTask) {
      selectButton = <button
          className="select-button"
          onClick={() => this.handleStartSelect()}>
            Change task
          </button>;
    }

    let timerButton = <button
      className="timer-button"
      disabled
      aria-hidden={ariaHidden}>
        Start
        </button>
    if (this.props.selectedTask && (this.props.timerStatus === 'stopped' || this.props.timerStatus === 'onBreak')) {
      timerButton = <button
        className="timer-button"
        onClick={() => this.handleStartTimer()}
        aria-hidden={ariaHidden}>
          Start
        </button>;
    } else if (this.props.selectedTask && (this.props.timerStatus === 'started' || this.props.timerStatus === 'onBreak')) {
      timerButton = <button
        className="timer-button"
        onClick={() => this.handleStopTimer()}
        aria-hidden={ariaHidden}>
          Stop
        </button>
    } else if (this.props.timerStatus === 'breakTime') {
      timerButton = <button
        className="timer-button"
        onClick={() => this.handleStartBreak()}
        aria-hidden={ariaHidden}>
          Break
        </button>
    }

    let taskName;
    if (this.props.columns && this.props.selectedTask) {
      this.props.columns.forEach(column => {
        column.tasks.forEach(task => {
          if (task.id === this.props.selectedTask) {
            taskName = task.name;
          }
        })
      });
    }

    let timeLeftMessage = 'Time until next break:';
    if (this.props.timerStatus === 'onBreak') {
      timeLeftMessage = 'Break time remaining:';
    }

    return (
      <section aria-label="Pomodoro Timer" className="timer">
        <header>
          <span aria-hidden="true">Pomodoro Timer</span>
            <DropdownMenu
              classes="timer-menu"
              showMenu={this.props.showTimerMenu}
              toggleMenu={() => this.toggleMenu()}
              links={[
                {
                  onClick: () => this.hideTimer(),
                  text: 'Hide',
                  href: "#app"
                }
              ]}
              ariaHidden={ariaHidden}
            />
        </header>
        <section className="timer-container">
          {selectButton}
          <section aria-hidden={ariaHidden} className="task-selected">
            <div className="task-selected-msg">
              Task selected:
            </div>
            <div className="task-selected-disp"> {taskName ? taskName : 'None'}
            </div>
          </section>
          <section aria-hidden={ariaHidden} className="timeleft">
            <div className="timeleft-msg">
              {timeLeftMessage}
            </div>
            <div className="timeleft-disp">
              {timeLeft}
            </div>
          </section>
          {timerButton}
        </section>
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
  columns: state.boardData.columns,
  showTimerMenu: state.timer.showTimerMenu,
  windowDimensions: state.activity.windowSize
});

export default connect(mapStateToProps)(Timer);

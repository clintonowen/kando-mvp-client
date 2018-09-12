import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  TIMER_TICK,
  START_SELECT,
  STOP_SELECT,
  SELECT_TASK,
  SHOW_TIMER_MENU,
  HIDE_TIMER_MENU
} from '../actions/timer';

const initialState = {
  timeLeft: 25 * 60 * 1000,
  timeElapsed: 0,
  timerStatus: 'stopped',
  selectStatus: 'stopped',
  selectedTask: null,
  showTimerMenu: false
};

export default (state=initialState, action) => {
  if (action.type === START_TIMER) {
    return Object.assign({}, state, {
      timerStatus: 'started'
    });
  }
  if (action.type === STOP_TIMER) {
    return Object.assign({}, state, {
      timeLeft: 25 * 60 * 1000,
      timeElapsed: 0,
      timerStatus: 'stopped'
    });
  }
  if (action.type === RESET_TIMER) {
    return Object.assign({}, state, initialState);
  }
  if (action.type === TIMER_TICK && state.timeLeft > 0) {
    return Object.assign({}, state, {
      timeLeft: state.timeLeft - 1000,
      timeElapsed: state.timeElapsed + 1000
    });
  }
  if (action.type === START_SELECT) {
    return Object.assign({}, state, {
      selectStatus: 'started'
    });
  }
  if (action.type === STOP_SELECT) {
    return Object.assign({}, state, {
      selectStatus: 'stopped'
    });
  }
  if (action.type === SELECT_TASK) {
    return Object.assign({}, state, {
      selectedTask: action.taskId
    })
  }
  if (action.type === SHOW_TIMER_MENU) {
    return Object.assign({}, state, {
      showTimerMenu: true
    });
  }
  if (action.type === HIDE_TIMER_MENU) {
    return Object.assign({}, state, {
      showTimerMenu: false
    });
  }
  return state;
};

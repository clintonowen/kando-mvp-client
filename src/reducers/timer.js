import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  TIMER_TICK,
  START_SELECT,
  STOP_SELECT,
  SELECT_TASK
} from '../actions/timer';

const initialState = {
  timeLeft: 25 * 60 * 1000,
  timeElapsed: 0,
  timerStatus: 'stopped',
  selectStatus: 'stopped',
  selectedTask: null
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
  return state;
};

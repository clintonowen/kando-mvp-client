export const START_TIMER = 'START_TIMER';
export const startTimer = () => ({
  type: START_TIMER
});

export const STOP_TIMER = 'STOP_TIMER';
export const stopTimer = () => ({
  type: STOP_TIMER
});

export const BREAK_TIME = 'BREAK_TIME';
export const breakTime = () => ({
  type: BREAK_TIME
});

export const START_BREAK = 'START_BREAK';
export const startBreak = () => ({
  type: START_BREAK
});

export const TIMER_TICK = 'TIMER_TICK';
export const timerTick = () => ({
  type: TIMER_TICK
});

export const START_SELECT = 'START_SELECT';
export const startSelect = () => ({
  type: START_SELECT
});

export const STOP_SELECT = 'STOP_SELECT';
export const stopSelect = () => ({
  type: STOP_SELECT
});

export const SELECT_TASK = 'SELECT_TASK';
export const selectTask = (taskId) => ({
  type: SELECT_TASK,
  taskId
});

export const SHOW_TIMER_MENU = 'SHOW_TIMER_MENU';
export const showTimerMenu = () => ({
  type: SHOW_TIMER_MENU
});

export const HIDE_TIMER_MENU = 'HIDE_TIMER_MENU';
export const hideTimerMenu = () => ({
  type: HIDE_TIMER_MENU
});

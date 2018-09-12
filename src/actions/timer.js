export const START_TIMER = 'START_TIMER';
export const startTimer = () => ({
  type: START_TIMER
});

export const STOP_TIMER = 'STOP_TIMER';
export const stopTimer = () => ({
  type: STOP_TIMER
});

export const RESET_TIMER = 'RESET_TIMER';
export const resetTimer = () => ({
  type: RESET_TIMER
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

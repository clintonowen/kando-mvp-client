import {
  FETCH_COLUMNS_SUCCESS,
  FETCH_TASKS_SUCCESS,
  SHOW_TASK_FORM,
  HIDE_TASK_FORM,
  SET_TIMER_COLUMN,
  UNSET_TIMER_COLUMN,
  UPDATE_TIME, 
  SEND_TIME_SUCCESS,
  ADD_TASK_SUCCESS,
  FETCH_ERROR
} from '../actions/board-data';

import { CLEAR_AUTH } from '../actions/auth';

const initialState = {
  columns: '',
  tasks: '',
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, initialState);
  }
  if (action.type === FETCH_COLUMNS_SUCCESS) {
    return Object.assign({}, state, {
      columns: [action.data[0]],
      error: null
    });
  }
  if (action.type === FETCH_TASKS_SUCCESS) {
    return Object.assign({}, state, {
      tasks: action.data,
      error: null
    });
  }
  if (action.type === SHOW_TASK_FORM) {
    return Object.assign({}, state, {
      columns: state.columns.map(column => {
        if (column.id === action.columnId) {
          return Object.assign({}, column, { showTaskForm: true })
        } else {
          return column;
        }
      })
    });
  }
  if (action.type === HIDE_TASK_FORM) {
    return Object.assign({}, state, {
      columns: state.columns.map(column => {
        if (column.id === action.columnId) {
          return Object.assign({}, column, { showTaskForm: false })
        } else {
          return column;
        }
      })
    });
  }
  if (action.type === SET_TIMER_COLUMN) {
    return Object.assign({}, state, {
      columns: state.columns.map(column => {
        if (column.id === action.columnId) {
          return Object.assign({}, column, { showTimer: true })
        } else {
          return column;
        }
      })
    });
  }
  if (action.type === UNSET_TIMER_COLUMN) {
    return Object.assign({}, state, {
      columns: state.columns.map(column => {
        if (column.showTimer === true) {
          const { showTimer, ...updated } = column;
          return updated;
        } else {
          return column;
        }
      })
    });
  }
  if (action.type === UPDATE_TIME) {
    return Object.assign({}, state, {
      tasks: state.tasks.map(task => 
        (task.id === action.taskId ?
          Object.assign({}, task, { time: task.time + 60000 }) : task
        ))
    });
  }
  if (action.type === SEND_TIME_SUCCESS) {
    const taskId = action.data.id;
    const taskTime = action.data.time;
    return Object.assign({}, state, {
      tasks: state.tasks.map(task => 
        (task.id === taskId ?
          Object.assign({}, task, { time: taskTime }) : task
        )),
      error: null
    });
  }
  if (action.type === ADD_TASK_SUCCESS) {
    const task = action.data;
    return Object.assign({}, state, {
      tasks: [...state.tasks, task],
      error: null
    });
  }
  if (action.type === FETCH_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}

import {
  FETCH_COLUMNS_SUCCESS,
  FETCH_TASKS_SUCCESS,
  SHOW_TASK_FORM,
  HIDE_TASK_FORM,
  TOGGLE_TASK_DRAGGING,
  SET_TIMER_COLUMN,
  UNSET_TIMER_COLUMN,
  UPDATE_TIME, 
  SEND_TIME_SUCCESS,
  ADD_TASK_SUCCESS,
  FETCH_ERROR,
  SET_DRAG_ELEMENT,
  SET_OVER_ELEMENT,
  UNSET_OVER_ELEMENT
} from '../actions/board-data';

import { CLEAR_AUTH } from '../actions/auth';

const initialState = {
  columns: [],
  tasks: [],
  error: null,
  dragElement: null,
  overElement: null,
  nodePlacement: null
};

export default function reducer(state = initialState, action) {
  if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, initialState);
  }
  if (action.type === FETCH_COLUMNS_SUCCESS && action.data.length > 0) {
    let columns = action.data;
    if (state.columns.length > 0) {
      let timerColumn = state.columns.find(column => column.showTimer === true);
      if (timerColumn) {
        columns = columns.map(column => {
          if (column.id === timerColumn.id) {
            return Object.assign({}, column, {showTimer: true});
          } else {
            return column;
          }
        });
      }
    }
    return Object.assign({}, state, {
      columns,
      error: null
    });
  }
  if (action.type === FETCH_TASKS_SUCCESS && action.data.length > 0) {
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
  if (action.type === TOGGLE_TASK_DRAGGING) {
    return Object.assign({}, state, {
      columns: state.columns.map(column => {
        const task = column.tasks.find(task => task.id === action.taskId);
        if (task) {
          const otherTasks = column.tasks.filter(task => task.id !== action.taskId);
          return Object.assign({}, column, {
            tasks: [...otherTasks, Object.assign({}, task, {
              dragging: !task.dragging
            })]
          });
        } else {
          return column;
        }
      })
    })
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
    const {taskId} = action;
    return Object.assign({}, state, {
      columns: state.columns.map(column => {
        let task = column.tasks.filter(task => task.id === taskId);
        if (task.length > 0) {
          const updatedTasks = column.tasks.map(task => 
            (task.id === taskId)
            ? Object.assign({}, task, { time: task.time + 60000 })
            : task
          );
          return Object.assign({}, column, { tasks: updatedTasks })
        } else {
          return column;
        }
      })
    });
  }
  if (action.type === SEND_TIME_SUCCESS && action.data) {
    const taskId = action.data.id;
    const taskTime = action.data.time;
    return Object.assign({}, state, {
      tasks: state.tasks.map(task => 
        (task.id === taskId
          ? Object.assign({}, task, { time: taskTime })
          : task
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
  if (action.type === SET_DRAG_ELEMENT) {
    const dragElement = action.data;
    return Object.assign({}, state, {
      dragElement
    });
  }
  if (action.type === SET_OVER_ELEMENT) {
    const { overElement, nodePlacement } = action;
    return Object.assign({}, state, {
      overElement,
      nodePlacement
    });
  }
  if (action.type === UNSET_OVER_ELEMENT) {
    return Object.assign({}, state, {
      overElement: null
    });
  }
  return state;
}

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_COLUMNS_SUCCESS = 'FETCH_COLUMNS_SUCCESS';
export const fetchColumnsSuccess = data => ({
  type: FETCH_COLUMNS_SUCCESS,
  data
});

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const fetchTasksSuccess = data => ({
  type: FETCH_TASKS_SUCCESS,
  data
});

export const SHOW_TASK_FORM = 'SHOW_TASK_FORM';
export const showTaskForm = (columnId) => ({
  type: SHOW_TASK_FORM,
  columnId
});

export const HIDE_TASK_FORM = 'HIDE_TASK_FORM';
export const hideTaskForm = (columnId) => ({
  type: HIDE_TASK_FORM,
  columnId
});

export const TOGGLE_TASK_DRAGGING = 'TOGGLE_TASK_DRAGGING';
export const toggleTaskDragging = (taskId) => ({
  type: TOGGLE_TASK_DRAGGING,
  taskId
});

export const SET_TIMER_COLUMN = 'SET_TIMER_COLUMN';
export const setTimerColumn = (columnId) => ({
  type: SET_TIMER_COLUMN,
  columnId
});

export const UNSET_TIMER_COLUMN = 'UNSET_TIMER_COLUMN';
export const unsetTimerColumn = () => ({
  type: UNSET_TIMER_COLUMN
});

export const UPDATE_TIME = 'UPDATE_TIME';
export const updateTime = (taskId) => ({
  type: UPDATE_TIME,
  taskId
});

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const addTaskSuccess = data => ({
  type: ADD_TASK_SUCCESS,
  data
});

export const SEND_TIME_SUCCESS = 'SEND_TIME_SUCCESS';
export const sendTimeSuccess = data => ({
  type: SEND_TIME_SUCCESS,
  data
});

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
});

export const fetchColumns = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/columns`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
    dispatch(fetchColumnsSuccess(data));
  })
  .catch(err => {
    dispatch(fetchError(err));
  });
};

export const fetchTasks = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
    dispatch(fetchTasksSuccess(data));
  })
  .catch(err => {
    dispatch(fetchError(err));
  });
};

export const addTask = (name, columnId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const data = { name };
  return fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
    const currentTasks = getState().boardData.columns.find(column => column.id === columnId).tasks.map(task => task.id);
    const updateData = {
      tasks: [ ...currentTasks, data.id ]
    };
    return dispatch(updateColumn(columnId, updateData));
  })
  .catch(err => {
    dispatch(fetchError(err));
  });
};

export const updateColumn = (columnId, updateData) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/columns/${columnId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
    headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(() => {
    dispatch(fetchColumns());
  })
  .catch(err => {
    dispatch(fetchError(err));
  });
};

export const updateTask = (taskId, updateData) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
    headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
    if (updateData.time) {
      dispatch(sendTimeSuccess(data));
    }
  })
  .catch(err => {
    dispatch(fetchError(err));
  });
};

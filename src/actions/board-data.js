import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_COLUMNS_SUCCESS = 'FETCH_COLUMNS_SUCCESS';
export const fetchColumnsSuccess = data => ({
  type: FETCH_COLUMNS_SUCCESS,
  data
});

export const FETCH_COLUMNS_ERROR = 'FETCH_COLUMNS_ERROR';
export const fetchColumnsError = error => ({
  type: FETCH_COLUMNS_ERROR,
  error
});

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const fetchTasksSuccess = data => ({
  type: FETCH_TASKS_SUCCESS,
  data
});

export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const fetchTasksError = error => ({
  type: FETCH_TASKS_ERROR,
  error
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

export const SEND_TIME_SUCCESS = 'SEND_TIME_SUCCESS';
export const sendTimeSuccess = data => ({
  type: SEND_TIME_SUCCESS,
  data
});

export const SEND_TIME_ERROR = 'SEND_TIME_ERROR';
export const sendTimeError = error => ({
  type: SEND_TIME_ERROR,
  error
});

export const fetchColumns = () => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/columns`, {
    method: 'GET',
    // headers: {
    //     // Provide our auth token as credentials
    //     Authorization: `Bearer ${authToken}`
    // }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
    dispatch(fetchColumnsSuccess(data));
  })
  .catch(err => {
    dispatch(fetchColumnsError(err));
  });
};

export const fetchTasks = () => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    // headers: {
    //     // Provide our auth token as credentials
    //     Authorization: `Bearer ${authToken}`
    // }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
    dispatch(fetchTasksSuccess(data));
  })
  .catch(err => {
    dispatch(fetchTasksError(err));
  });
};

export const sendTime = (taskId, tasks) => (dispatch, getState) => {
  // const authToken = getState().auth.authToken;
  const [ task ] = tasks.filter(task => task.id === taskId);
  const data = { time: task.time }
  return fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        // // Provide our auth token as credentials
        // Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {res.json()})
  .then((data) => {
    dispatch(sendTimeSuccess(data));
  })
  .catch(err => {
    dispatch(sendTimeError(err));
  });
};

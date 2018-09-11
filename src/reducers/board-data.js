import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR
} from '../actions/board-data';

const initialState = {
  tasks: '',
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_TASKS_SUCCESS) {
      return Object.assign({}, state, {
          tasks: action.data,
          error: null
      });
  } else if (action.type === FETCH_TASKS_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  }
  return state;
}

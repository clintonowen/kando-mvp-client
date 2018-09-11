import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import activityReducer from './reducers/activity';
import boardDataReducer from './reducers/board-data';

const store = createStore(
  combineReducers({
    form: formReducer,
    activity: activityReducer,
    boardData: boardDataReducer
  }),
  applyMiddleware(thunk)
);

export default store;

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import activityReducer from './reducers/activity';

const store = createStore(
  combineReducers({
    form: formReducer,
    activity: activityReducer
  }),
  applyMiddleware(thunk)
);

export default store;

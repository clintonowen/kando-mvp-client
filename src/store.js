import { createStore } from 'redux';

import activityReducer from './reducers/activity';

const store = createStore(
  activityReducer
);

export default store;

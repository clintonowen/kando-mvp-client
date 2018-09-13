import {
  SHOW_NAV_MENU,
  HIDE_NAV_MENU
} from '../actions/activity';

import { CLEAR_AUTH } from '../actions/auth';

const initialState = {
  showNavMenu: false
};

export default (state=initialState, action) => {
  if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, initialState);
  }
  if (action.type === SHOW_NAV_MENU) {
    return Object.assign({}, state, {
      showNavMenu: true
    });
  }
  if (action.type === HIDE_NAV_MENU) {
    return Object.assign({}, state, {
      showNavMenu: false
    });
  }
  return state;
};

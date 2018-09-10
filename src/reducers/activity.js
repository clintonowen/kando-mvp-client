import {
  SHOW_NAV_MENU,
  HIDE_NAV_MENU
} from '../actions/activity';

const initialState = {
  showNavMenu: false
};

export default (state=initialState, action) => {
  if (action.type === SHOW_NAV_MENU) {
    console.log('SHOW_NAV_MENU ran');
    return Object.assign({}, state, {
      showNavMenu: true
    });
  }
  if (action.type === HIDE_NAV_MENU) {
    console.log('HIDE_NAV_MENU ran');
    return Object.assign({}, state, {
      showNavMenu: false
    });
  }
  return state;
};

export const SHOW_NAV_MENU = 'SHOW_NAV_MENU';
export const showNavMenu = () => ({
  type: SHOW_NAV_MENU
});

export const HIDE_NAV_MENU = 'HIDE_NAV_MENU';
export const hideNavMenu = () => ({
  type: HIDE_NAV_MENU
});

export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export const setWindowSize = (width, height) => ({
  type: SET_WINDOW_SIZE,
  width,
  height
});

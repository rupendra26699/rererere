import { HIDE_SIDEBAR, SHOW_SIDEBAR } from "../actions";

const initialState = {
  collapsed: false,
};
const toggleSidebarReducer = (action, state = initialState) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        collapsed: false,
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        collapsed: true,
      };
    default:
      return state;
  }
};

export default toggleSidebarReducer;

import {HIDE_LOGOUT ,SHOW_LOGOUT} from "../actions";

const initialState = {
  collapsedLogout: false,
};
const toggleLogoutDialog = ( action, state = initialState) => {
  switch (action.type) {
    case SHOW_LOGOUT:
      return {
        ...state,
        collapsedLogout: false,
      };
    case HIDE_LOGOUT:
      return {
        ...state,
        collapsedLogout: true,
      };
    default:
      return state;
  }
};

export default toggleLogoutDialog;

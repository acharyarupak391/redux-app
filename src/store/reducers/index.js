import {
  REQUEST_SUCCESS_LABEL,
  REQUEST_FAILED_LABEL,
  RESET_STATE,
  DISPATCH_MESSAGE,
} from "../actions/index";

export default function formReducer(state, action) {
  console.log("(reducer) state: ", state, "action: ", action);
  switch (action.type) {
    case REQUEST_SUCCESS_LABEL:
      return {
        ...state,
        user: action.data.user,
        status: action.data.status,
        error: null,
      };

    case REQUEST_FAILED_LABEL:
      return {
        ...state,
        user: null,
        error: action.error,
        status: action.error.status,
      };

    case RESET_STATE:
      return {
        user: null,
        error: null,
        status: null,
        message: null,
      };

    case DISPATCH_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
}

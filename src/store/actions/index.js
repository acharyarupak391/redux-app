export const INITIATE_LOGIN = "INITIATE_LOGIN";
export const REQUEST_SUCCESS_LABEL = "REQUEST_SUCCESS_LABEL";
export const REQUEST_FAILED_LABEL = "REQUEST_FAILED_LABEL";
export const RESET_STATE = "RESET_STATE";
export const DISPATCH_MESSAGE = "DISPATCH_MESSAGE";

export const initiate_login = (login_params) => ({
  type: INITIATE_LOGIN,
  payload: login_params,
});

export const reset_state = () => ({
  type: RESET_STATE,
});

export const dispatch_message = (message) => ({
  type: DISPATCH_MESSAGE,
  message,
});

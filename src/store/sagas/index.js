import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  REQUEST_SUCCESS_LABEL,
  REQUEST_FAILED_LABEL,
  RESET_STATE,
} from "../actions/index";

function* initiate_login(action) {
  try {
    let url = "https://api.test.01cloud.dev/user/login";
    const data = yield axios
      .post(url, {
        email: action.payload.email,
        password: action.payload.password,
      })
      .then((res) => {
        return { status: res.status, user: res.data.user };
      });
    yield put({ type: REQUEST_SUCCESS_LABEL, data });
  } catch (error) {
    yield put({
      type: REQUEST_FAILED_LABEL,
      error: {
        status: error.response.status,
        message: error.response.data.error,
      },
    });
  }
}

export default function* rootSaga() {
  yield takeLatest("INITIATE_LOGIN", initiate_login);
  yield put({ type: RESET_STATE });
  // yield takeLatest(DISPATCH_MESSAGE, dispatch_message);
}

import React from "react";
import { render } from "react-dom";
import Form from "./components/Form";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
// import { logger } from "redux-logger";
import formReducer from "./reducers/index";
import rootSaga from "./sagas/index";

const initialState = {
  user: null,
  error: null,
  status: null
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  formReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="form-div">
          <Form />
        </div>
      </Provider>
    );
  }
}

render(<App />, window.document.getElementById("root"));

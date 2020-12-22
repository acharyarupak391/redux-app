import React from "react";
import { render } from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
// import { logger } from "redux-logger";
import formReducer from "./store/reducers/index";
import rootSaga from "./store/sagas/index";
import { BrowserRouter } from "react-router-dom";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

const initialState = {
  user: null,
  error: null,
  status: null,
  message: null,
};

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, formReducer);

const store = createStore(
  // formReducer,
  persistedReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

class Home extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="main-div">
            <App />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  window.document.getElementById("root")
);

export default store;

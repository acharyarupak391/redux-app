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

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'

const initialState = {
  user: {first_name: ""},
  error: null,
  status: null
};

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, formReducer);

const store = createStore(
  // formReducer,
  persistedReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store)


sagaMiddleware.run(rootSaga);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="form-div">
            <Form />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

render(<App />, window.document.getElementById("root"));

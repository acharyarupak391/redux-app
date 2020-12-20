import React from "react";
import { render } from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
// import { logger } from "redux-logger";
import formReducer from "./reducers/index";
import rootSaga from "./sagas/index";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import About from "./components/About";

const initialState = {
  user: null,
  error: null,
  status: null,
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

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="form-div">
            <Switch>
              {/* <Route path="/login" render={(props) => <Form {...props} />} /> */}
              <Route path="/login" component={Form} />
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  window.document.getElementById("root")
);

/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import sagas from "./sagas";
import App from "./components/App";

const buildStore = () => {
  const saga = createSagaMiddleware();
  const middles = [saga];
  const enhancers = [];

  if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middles),
    ...enhancers
  );

  saga.run(sagas);

  return createStore(reducers, composedEnhancers);
};

ReactDOM.render(
  <Provider store={buildStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import sagas from "./sagas";
import App from "./components/App";

const history = createBrowserHistory();

const buildStore = history => {
  const saga = createSagaMiddleware();
  const connectedRouter = routerMiddleware(history);
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

  // saga.run(sagas);

  return createStore(createRootReducer(history), composedEnhancers);
};

ReactDOM.render(
  <Provider store={buildStore(history)}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

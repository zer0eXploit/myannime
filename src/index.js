import React from "react";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";

import App from "./containers/App";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import rootReducer from "./store/reducers";

import "./i18n";

import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

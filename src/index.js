import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import homeReducer from "./store/reducers/Home";
import animeInfoReducer from "./store/reducers/Anime-Info";
import animeVideoReducer from "./store/reducers/Video";
import toZawgyiReducer from "./store/reducers/ToZawgyi";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const rootReducer = combineReducers({
  home: homeReducer,
  info: animeInfoReducer,
  video: animeVideoReducer,
  mmfont: toZawgyiReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

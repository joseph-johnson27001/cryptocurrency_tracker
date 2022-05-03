import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

import App from "./App.js";
import store from "./app/store";
import "antd/dist/antd.css";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ScrollToTop />
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

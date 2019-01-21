import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Counter from "./Counter";

import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./Reducer";

const store = createStore(Reducer);

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);

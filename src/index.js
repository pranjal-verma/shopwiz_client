import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./context/UserContext";
ReactDOM.render(
  <React.StrictMode>
    {/* <UserContext.Provider value={{ user, setUser }}> */}
    <Router>
      <App />
    </Router>
    {/* </UserContext.Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import App from "./components/common/App.jsx";
import * as serviceWorker from "./serviceWorker";
import "./theme.scss";
import "./styles.scss";

// Load fonts using webfontloader to not block the main thread.
WebFont.load({
  google: {
    families: ["Material Icons"]
  }
});

ReactDOM.render(<App />, document.getElementById("root"));

// NOTE: THE ENVIRONMENT VARIABLE "SASS_PATH" NEEDS TO BE SET TO ".\node_modules" FOR MDC TO WORK!

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import MainLayout from "./MainLayout";
import ErrorBoundary from "./ErrorBoundary";
//import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: "dark", // TODO: Should default be dark or light? Probably light.
    };
    this.onToggleTheme = this.onToggleTheme.bind(this);
  }

  onToggleTheme() {
    this.setState(oldState => {
      const newTheme = oldState.theme === "light" ? "dark" : "light";
      document.documentElement.classList.add("color-theme-in-transition");
      document.documentElement.setAttribute("data-theme", newTheme);
      window.setTimeout(() => {
        document.documentElement.classList.remove("color-theme-in-transition");
      }, 1000);
      return { theme: newTheme };
    });
  }

  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <MainLayout
            theme={this.state.theme}
            onToggleTheme={this.onToggleTheme} />
        </ErrorBoundary>
      </BrowserRouter>
    );
  }

}

export default App;

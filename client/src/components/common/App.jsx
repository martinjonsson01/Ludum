import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Sheltr from "@taito/react-sheltr";
import "./App.scss";
import MainLayout from "./MainLayout";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeContext } from "./ThemeContext";
import { UserContext } from "./UserContext";
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);

    this.setDocumentTheme = (theme, noTransition) => {
      if (!noTransition) {
        document.documentElement.classList.add("color-theme-in-transition");
      }

      document.documentElement.setAttribute("data-theme", theme);

      if (!noTransition) {
        window.setTimeout(() => {
          document.documentElement.classList.remove("color-theme-in-transition");
        }, 1000);
      }
    };

    this.onToggleTheme = () => {
      this.setState(oldState => {
        const newTheme = oldState.theme === "light" ? "dark" : "light";
        this.setDocumentTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
      });
    };

    this.signInUser = (user) => {
      this.setState({ user: user });
    };

    this.signOutUser = () => {
      axios.delete("http://localhost:3001/api/current-user", { withCredentials: true })
        .then(async () => {
          // Check if auth systems are still initialized.
          if (window.gapi.auth2 && window.gapi.auth2.getAuthInstance()) {
            // Wait for signout to complete before setting state.
            await window.gapi.auth2.getAuthInstance().signOut();
            this.setState({ user: null });
          } else {
            this.setState({ user: null });
          }
        });
    };

    const currentTheme = localStorage.getItem("theme") || "light";
    this.setDocumentTheme(currentTheme, true);



    this.state = {
      theme: currentTheme,
      toggleTheme: this.onToggleTheme,
      user: null,
      signInUser: this.signInUser,
      signOutUser: this.signOutUser,
    };
  }

  render() {
    return (
      //<React.StrictMode>
      <BrowserRouter>
        <ThemeContext.Provider value={this.state}>
          <UserContext.Provider value={this.state}>
            <ErrorBoundary>
              <Sheltr delay={200}>
                <MainLayout />
              </Sheltr>
            </ErrorBoundary>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
      //</React.StrictMode>
    );
  }

}

export default App;


import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Sheltr from "@taito/react-sheltr";
import "./App.scss";
import MainLayout from "./MainLayout";
import ErrorBoundary from "./ErrorBoundary";
import { AppContext } from "./AppContext";
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

    this.setTitle = (title, onlyDocumentTitle) => {
      if (onlyDocumentTitle) {
        this.setState({
          appBarTitle: "",
          documentTitle: title
        });
      } else {
        this.setState({
          appBarTitle: title,
          documentTitle: title
        });
      }
    };

    this.setAccessToken = (accessToken) => {
      this.setState({ accessToken: accessToken });
    };

    this.setAuthUser = (authUser) => {
      this.setState({ authUser: authUser });
    };

    const currentTheme = localStorage.getItem("theme") || "light";
    this.setDocumentTheme(currentTheme, true);

    this.state = {
      theme: currentTheme,
      toggleTheme: this.onToggleTheme,
      user: null,
      signInUser: this.signInUser,
      signOutUser: this.signOutUser,
      appBarTitle: "Ludum",
      documentTitle: "Ludum",
      setTitle: this.setTitle,
      accessToken: null,
      setAccessToken: this.setAccessToken,
      authUser: null,
      setAuthUser: this.setAuthUser,
    };
  }

  componentDidUpdate() {
    // Update document title.
    document.title = `${this.state.documentTitle}`;
  }

  render() {
    return (
      //<React.StrictMode>
      <BrowserRouter>
        <AppContext.Provider value={this.state}>
          <ErrorBoundary>
            <Sheltr delay={100} easing="cubic-bezier(0.4, 0.0, 0.2, 1)">
              <MainLayout />
            </Sheltr>
          </ErrorBoundary>
        </AppContext.Provider>
      </BrowserRouter>
      //</React.StrictMode>
    );
  }

}

export default App;


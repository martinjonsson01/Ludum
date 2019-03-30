import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import MainLayout from "./MainLayout";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeContext } from "./ThemeContext";
import { UserContext } from "./UserContext";
import Splashscreen from "./Splashscreen";
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

    this.signInUser = (GoogleUser) => {
      if (GoogleUser.tokenId) {
        //console.log(`token_id: ${GoogleUser.tokenId}`);
        this.setState({ loading: false, user: GoogleUser });
        // TODO: Only post GoogleUser.tokenId.
        axios.post(
          "http://localhost:3001/api/current-user",
          GoogleUser,
          { withCredentials: true }
        );
      }
    };

    this.signOutUser = () => {
      axios.delete("http://localhost:3001/api/current-user", { withCredentials: true })
        .then(() => this.setState({ user: null }));
    };

    const currentTheme = localStorage.getItem("theme") || "light";
    this.setDocumentTheme(currentTheme, true);

    let sessionExists = false;
    // Check if session cookie exists.
    if (document.cookie.match(/^(.*;)?\s*connect.sid\s*=\s*[^;]+(.*)?$/)) {
      sessionExists = true;
      // GET current user.
      axios.get("http://localhost:3001/api/current-user", { withCredentials: true }).then(res => {
        this.setState({ loading: false, user: res.data });
      }).catch(() => {
        this.setState({ loading: false });
      });
    }

    this.state = {
      loading: sessionExists,
      theme: currentTheme,
      toggleTheme: this.onToggleTheme,
      user: null,
      signInUser: this.signInUser,
      signOutUser: this.signOutUser,
    };
  }

  render() {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <ThemeContext.Provider value={this.state}>
            <UserContext.Provider value={this.state}>
              <ErrorBoundary>
                {
                  this.state.loading ?
                    <Splashscreen /> :
                    <MainLayout />
                }
              </ErrorBoundary>
            </UserContext.Provider>
          </ThemeContext.Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }

}

export default App;


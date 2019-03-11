import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import MainLayout from '../MainLayout/MainLayout'; 
//import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    const theme = this.state.theme === "light" ? "dark" : "light";
    document.documentElement.classList.add("color-theme-in-transition");
    this.setState({ theme });
    document.documentElement.setAttribute("data-theme", theme);
    window.setTimeout(() => {
      document.documentElement.classList.remove("color-theme-in-transition");
    }, 1000);
  }

  render() {
    return (
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );
  }

}

export default App;

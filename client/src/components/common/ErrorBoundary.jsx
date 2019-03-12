import React, { Component } from "react";
import PropTypes from "prop-types";
import { Body1, Headline3 } from "@material/react-typography";

export default class ErrorBoundary extends Component {

  static get propTypes() {
    return {
      children: PropTypes.any,
    };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <React.Fragment>
          <Headline3>OOPSIE WOOPSIE!!</Headline3>
          <Body1>Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</Body1>
        </React.Fragment>
      );
    }

    return this.props.children;
  }

}

import React, { useContext } from "react";
import { AppContext } from "./AppContext";
export default function withTitle(WrappedComponent, componentTitle) {
  return function WithTitle(props) {
    const { appBarTitle, setTitle } = useContext(AppContext);
    if (appBarTitle !== componentTitle) {
      setTitle(componentTitle);
    }
    return <WrappedComponent {...props}/>;
  };
}
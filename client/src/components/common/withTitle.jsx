import React, { useContext } from "react";
import { AppContext } from "./AppContext";
export default function withTitle(WrappedComponent, componentTitle) {
  return function WithTitle(props) {
    const { title, setTitle } = useContext(AppContext);
    if (title !== componentTitle) {
      setTitle(componentTitle);
    }
    return <WrappedComponent {...props}/>;
  };
}
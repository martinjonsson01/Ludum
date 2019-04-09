import React from "react";
export const AppContext = React.createContext({
  theme: "light",
  toggleTheme: null,
  user: null,
  signInUser: null,
  signOutUser: null,
  title: "Ludum",
  setTitle: null,
});
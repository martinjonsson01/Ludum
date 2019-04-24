import React from "react";
export const AppContext = React.createContext({
  theme: "light",
  toggleTheme: null,
  user: null,
  signInUser: null,
  signOutUser: null,
  appBarTitle: "Ludum",
  documentTitle: "Ludum",
  setTitle: null,
  accessToken: null,
  setAccessToken: null,
  authUser: null,
  setAuthUser: null,
});
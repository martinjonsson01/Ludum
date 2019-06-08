import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../common/AppContext";
import { addGoogleClientLibraryScript, parseGoogleUser } from "../../Util";

/**
 * Scopes to request from users.
 */
const defaultScopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  /*"https://www.googleapis.com/auth/user.birthday.read",
  "https://www.googleapis.com/auth/user.addresses.read",*/
];

function SignInButton({ onSuccess, onFailure, onRequest }) {

  const theme = useContext(AppContext).theme;

  function renderSignInButton() {
    window.gapi.signin2.render("google-sign-in-button", {
      "scope": defaultScopes.join(" "),
      "onsuccess": (googleUser) => onSuccess(parseGoogleUser(googleUser)),
      "onfailure": onFailure,
      "theme": theme,
      "prompt": "select_account"
    });
  }

  // Check if Google client library script has been added to DOM.
  if (!window.gapi) {
    addGoogleClientLibraryScript()
      .then(() => {
        window.gapi.load("signin2", () => {
          renderSignInButton();
        });
      });
  } else {
    if (!window.gapi.signin2) {
      window.gapi.load("signin2", () => {
        renderSignInButton();
      });
    }
  }

  useEffect(() => {
    document.getElementById("google-sign-in-button")
      .onclick = onRequest;

    if (window.gapi && window.gapi.signin2) {
      renderSignInButton();
    }

    return () =>
      document.getElementById("google-sign-in-button")
        .onclick = null;
  });

  return (
    <div id="google-sign-in-button" />
  );
}

SignInButton.propTypes = {
  onRequest: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

export default SignInButton;

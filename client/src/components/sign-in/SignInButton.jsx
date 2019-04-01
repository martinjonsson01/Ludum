import React from "react";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import { ThemeContext } from "../common/ThemeContext";

/**
 * Scopes to request from users.
 */
const defaultScopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/user.birthday.read",
  "https://www.googleapis.com/auth/user.addresses.read",
];

function SignInButton({ onRequest, onSuccess, onFailure }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) =>
        <GoogleLogin
          clientId="425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com"
          buttonText="Logga in med Google"
          scope={defaultScopes.join(" ")}
          onSuccess={onSuccess}
          onFailure={onFailure}
          onRequest={onRequest}
          theme={theme}
          isSignedIn={false}
        />
      }
    </ThemeContext.Consumer>
  );
}

SignInButton.propTypes = {
  onRequest: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

export default SignInButton;

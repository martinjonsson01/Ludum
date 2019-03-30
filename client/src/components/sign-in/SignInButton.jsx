import React from "react";
import styled from "styled-components";
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

const ToggleDisplayButton = styled(GoogleLogin)`
  display: ${props => props.hidden ? "none" : "inline-flex"} !important;
`;

function SignInButton({ hidden }) {
  return (
    <ThemeContext.Consumer>
      {({ user, signInUser }) =>
        <ToggleDisplayButton
          hidden={hidden}
          clientId="425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com"
          buttonText="Logga in med Google"
          scope={defaultScopes.join(" ")}
          onSuccess={signInUser}
          onFailure={signInUser}
          theme={user}
          isSignedIn={false}
        />
      }
    </ThemeContext.Consumer>
  );
}

SignInButton.propTypes = {
  hidden: PropTypes.bool
};

export default SignInButton;

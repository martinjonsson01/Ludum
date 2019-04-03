import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { Headline4, Body1 } from "@material/react-typography";
import { SharedElement } from "@taito/react-sheltr";
import SignInButton from "./SignInButton";
import Splashscreen from "../common/Splashscreen";
import axios from "axios";

import logo from "../../media/logo-104x104.png";

const Center = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  position: relative;
  max-width: 40vmax;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: horizontal;
`;
const Error = styled(Body1)`
  margin-bottom: 3rem;
`;
const Logo = styled.img`
  position: absolute;
  width: 104px;
  height: 104px;
  left: -12rem;
  top: -1.8rem;
`;
const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const MainContent = styled.div`
  opacity: 0;
  animation-name: ${fade};
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
`;

function SignInPage({ signInUser }) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onRequest() {
    setError(null);
    setLoading(true);
  }

  async function onSuccess(googleUser) {
    if (googleUser.tokenId) {
      try {
        // Post googleUser.tokenId for authentication.
        const res = await axios.post(
          "http://localhost:3001/api/current-user",
          `idToken=${googleUser.tokenId}`,
          { withCredentials: true }
        );
        setLoading(false);
        signInUser(res.data);
      } catch (error) {
        onFailure(error.response);
      }
    }
  }

  function onFailure(response) {
    if (response.status === 401) {
      // Explain to user why authentication failed using supplied error message.
      setError(response.data);
    }
    if (response.error === "popup_closed_by_user") {
      // Explain to user why authentication failed when the popup was closed.
      setError("Inloggningsfönstret stängdes.");
    }
    setLoading(false);
  }

  useEffect(() => {
    // Check if session cookie exists.
    if (document.cookie.match(/^(.*;)?\s*connect.sid\s*=\s*[^;]+(.*)?$/)) {
      // GET current user.
      axios.get("http://localhost:3001/api/current-user", { withCredentials: true }).then(res => {
        setLoading(false);
        signInUser(res.data);
      }).catch(() => {
        setLoading(false);
      });
    }
    setLoading(false);
  }, [signInUser]);

  return (
    loading ?
      <Splashscreen />
      :
      <Center>
        <Content>
          <SharedElement sharedId="logo" startOnUnmount>
            {sheltrProps =>
              <Logo
                {...sheltrProps}
                src={logo}
                alt="Ludum logotyp"
              />
            }
          </SharedElement>
          <MainContent>
            <Headline4>Du är inte inloggad</Headline4>
            <Error>{error}</Error>
            <SignInButton
              onRequest={onRequest}
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
          </MainContent>
        </Content>
      </Center>
  );
}

SignInPage.propTypes = {
  signInUser: PropTypes.func.isRequired,
};

export default SignInPage;

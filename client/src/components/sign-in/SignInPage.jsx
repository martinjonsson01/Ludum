import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { Headline4, Body1 } from "@material/react-typography";
import { SharedElement } from "@taito/react-sheltr";
import SignInButton from "./SignInButton";
import Splashscreen from "../common/Splashscreen";
import { addGoogleClientLibraryScript, parseGoogleUser } from "../../Util";
import axios from "axios";

import logo from "../../media/logo-104x104.png";

function SignInPage({ signInUser }) {

  const [loading, setLoading] = useState(shouldBeLoading());
  const [error, setError] = useState(null);

  function shouldBeLoading() {
    if (!window.gapi) return true;
    if (!window.gapi.auth2) return true;
    return false;
  }

  function onRequest() {
    setError(null);
    setLoading(true);
  }

  async function onSuccess(googleUser) {
    if (googleUser.tokenId) {
      try {
        // PUT googleUser.tokenId for authentication.
        const res = await axios.put(
          "http://localhost:3001/api/current-user",
          `idToken=${googleUser.tokenId}`,
          { withCredentials: true }
        );
        var img = new Image();
        img.src = res.data.picture;
        // Sign-in new user after profile image has loaded.
        img.onload = () => signInUser(res.data);
        img.onerror = (error) => onFailure(error);
        img.onabort = (error) => onFailure(error);
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

  function initAuth2() {
    if (!window.gapi.auth2.getAuthInstance()) {
      const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        /*"https://www.googleapis.com/auth/user.birthday.read",
        "https://www.googleapis.com/auth/user.addresses.read",*/
      ];
      window.gapi.auth2.init({
        client_id: "425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com",
        cookie_policy: "single_host_origin",
        login_hint: "Login hint här",
        //hosted_domain: "*.ga.lbs.se",  TODO: Needs to allow both elev.ga.lbs.se and ga.lbs.se. See GitHub issue: https://github.com/google/google-api-javascript-client/issues/210
        fetch_basic_profile: true,
        ux_mode: "popup",
        scopes,
        access_type: "online"
      }).then(res => {
        if (res.isSignedIn.get()) {
          const googleUser = res.currentUser.get();
          onSuccess(parseGoogleUser(googleUser));
        }
        else {
          setLoading(false);
        }
      }, err => onFailure(err));
    }
    else {
      // If user is not signed in.
      if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        setLoading(false);
      }
    }
  }

  async function initGoogleAuth() {
    // Add Google client library script to DOM.
    await addGoogleClientLibraryScript();

    if (!window.gapi.auth2) {
      window.gapi.load("auth2", () => {
        initAuth2();
      });
    } else {
      initAuth2();
    }
  }

  useEffect(() => {
    // Check if session cookie exists.
    if (document.cookie.match(/^(.*;)?\s*connect.sid\s*=\s*[^;]+(.*)?$/)) {
      // GET current user.
      axios.get("http://localhost:3001/api/current-user", { withCredentials: true })
        .then(res => {
          // "Register" already signed-in user.
          signInUser(res.data);
        }).catch(() => {
          setLoading(false);
        });
    }

    // Then init auth.
    initGoogleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/*Empty array means effect will only be called on initial render.*/]);

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

export default SignInPage;

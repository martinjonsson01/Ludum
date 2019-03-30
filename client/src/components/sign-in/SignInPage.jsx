import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Headline4 } from "@material/react-typography";

import logo from "../../media/LoggaLudum.png";
import SignInButton from "./SignInButton";

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
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: horizontal;
`;
const Title = styled(Headline4)`
  margin-bottom: 3rem;
`;
const Logo = styled.img`
  position: absolute;
  left: -12rem;
  top: -1.8rem;
`;
function SignInPage({ theme }) {

  return (
    <Center>
      <Content>
        <Logo src={logo} />
        <div>
          <Title>Du är inte inloggad</Title>
          <SignInButton theme={theme} />
        </div>
      </Content>
    </Center>
  );
}

SignInPage.propTypes = {
  theme: PropTypes.string,
};

export default SignInPage;

import React from "react";
import styled, { keyframes } from "styled-components";
import { SharedElement } from "@taito/react-sheltr";
import LinearProgress from "@material/react-linear-progress";
import { Headline3 } from "@material/react-typography";

import logo from "../../media/logo-144x144.png";

const Center = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 4px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 144px;
  height: 144px;
  margin: 2rem;
`;
const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Title = styled(Headline3)`
  opacity: 0;
  animation-name: ${fade};
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
`;

function Splashscreen() {
  return (
    <React.Fragment>
      <LinearProgress indeterminate={true} />
      <Center>
        <SharedElement sharedId="logo" startOnUnmount>
          {sheltrProps =>
            <Logo
              {...sheltrProps}
              src={logo}
              alt="Ludum logotyp"
            />
          }
        </SharedElement>
        <Title>
          Ludum
        </Title>
      </Center>
    </React.Fragment>
  );
}

export default Splashscreen;

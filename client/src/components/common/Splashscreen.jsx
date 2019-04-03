import React from "react";
import styled, { keyframes } from "styled-components";
import CircularProgress from "./CircularProgress";
import { SharedElement } from "@taito/react-sheltr";
import { Headline3 } from "@material/react-typography";

import logo from "../../media/logo-144x144.png";

function Splashscreen() {
  return (
    <React.Fragment>
      {/*<LinearProgress indeterminate={true} />*/}
      <Center>
        <CircularProgress>
          <SharedElement sharedId="logo" startOnUnmount>
            {sheltrProps =>
              <Logo
                {...sheltrProps}
                src={logo}
                alt="Ludum logotyp"
              />
            }
          </SharedElement>
        </CircularProgress>
        <Title>
          Ludum
        </Title>
      </Center>
    </React.Fragment>
  );
}

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

export default Splashscreen;

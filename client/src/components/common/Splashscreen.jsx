import React from "react";
import styled from "styled-components";
import LinearProgress from "@material/react-linear-progress";
import { Headline3 } from "@material/react-typography";

import logo from "../../media/LoggaLudum.png";

const Center = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 4px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function Splashscreen() {
  return (
    <React.Fragment>
      <LinearProgress indeterminate={true} />
      <Center>
        <img src={logo} alt="Ludum logotyp" />
        <Headline3>
          Ludum
        </Headline3>
      </Center>
    </React.Fragment>
  );
}

export default Splashscreen;

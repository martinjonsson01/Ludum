import React from "react";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import styled from "styled-components";

import "./NewsPage.scss";

const Container = styled.div`
  width: 50vmax;
  margin: auto;
  background: red;
`;

function NewsPage() {
  return (
    <Container>
      <Grid>
        <Row>
          <Cell columns={3}>
            Test1
          </Cell>
          <Cell columns={6} >
            Test2
          </Cell>
          <Cell columns={3}>
            Test3
          </Cell>
        </Row>
      </Grid>
    </Container>
  );
}

export default NewsPage;

import React from "react";
import styled from "styled-components";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import { Headline5 } from "@material/react-typography";

import FetchList from "../common/FetchList";
import CourseItem from "./CourseItem";

const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 0 auto;
`;

function CoursesPage() {
  return (
    <Container>
      <Grid>
        <Row>
          <Cell columns={6} tabletColumns={8}>
            <Card className="full-height">
              <Headline5 className="card-title">Generella</Headline5>
              <FetchList
                url="http://localhost:3001/api/general-courses"
                listItemComponent={CourseItem}
              />
            </Card>
          </Cell>
          <Cell columns={6} tabletColumns={8}>
            <Card className="full-height">
              <Headline5 className="card-title">Specifika</Headline5>
              <FetchList
                url="http://localhost:3001/api/specific-courses"
                listItemComponent={CourseItem}
              />
            </Card>
          </Cell>
        </Row>
      </Grid>
    </Container>
  );
}

export default CoursesPage;

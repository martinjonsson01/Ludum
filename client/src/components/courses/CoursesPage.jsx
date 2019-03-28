import React, { lazy } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import { Headline5 } from "@material/react-typography";
import { ListDivider } from "@material/react-list";

import FetchList from "../common/FetchList";
import CourseItem from "./CourseItem";

// Lazy-load CoursePage.
const CoursePage = lazy(() => import("../courses/CoursePage"));

const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 0 auto;
`;

function CoursesPage(props) {

  function renderCourses() {
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
                  listDivider={ListDivider}
                  onNavigateChange={props.onNavigateChange}
                />
              </Card>
            </Cell>
            <Cell columns={6} tabletColumns={8}>
              <Card className="full-height">
                <Headline5 className="card-title">Specifika</Headline5>
                <FetchList
                  url="http://localhost:3001/api/specific-courses"
                  listItemComponent={CourseItem}
                  listDivider={ListDivider}
                  onNavigateChange={props.onNavigateChange}
                />
              </Card>
            </Cell>
          </Row>
        </Grid>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Route path={`${props.match.path}/:code`} component={props => <CoursePage {...props} />} />
      <Route
        exact
        path={props.match.path}
        render={renderCourses}
      />
    </React.Fragment>
  );
}

CoursesPage.propTypes = {
  onNavigateChange: PropTypes.func,
  match: PropTypes.object,
};

export default CoursesPage;

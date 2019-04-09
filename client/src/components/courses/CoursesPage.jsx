import React, { lazy } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "fetch-suspense";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import { Headline5 } from "@material/react-typography";
import List, { ListDivider } from "@material/react-list";
import withTitle from "../common/withTitle.jsx";

import CourseItem from "./CourseItem";

// Lazy-load CoursePage.
const CoursePage = lazy(() => import("../courses/CoursePage"));

const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 0 auto;
`;
const ScrollableList = styled(List)`
  overflow-y: hidden;
  ${ScrollableList}:hover {
    overflow-y: auto;
  }
  ${ScrollableList}::-webkit-scrollbar-track {
    margin-top: 4px;
  }
`;

function CoursesPage(props) {

  const courses = useFetch("http://localhost:3001/api/courses", {
    method: "GET", credentials: "include"
  });

  function renderCourses() {
    return (
      <Container>
        <Grid>
          <Row>
            {Object.keys(courses).map(studentGroupId => {
              const studentGroupCourses = courses[studentGroupId];
              return (
                <Cell
                  columns={6}
                  tabletColumns={8}
                  key={studentGroupId}
                >
                  <Card className="full-height">
                    <Headline5 className="card-title">{studentGroupId}</Headline5>
                    <ScrollableList>
                      {studentGroupCourses.map((course, index, array) => [
                        <CourseItem
                          key={course.course_code}
                          listItem={course}
                          index={index}
                          array={array}
                          onNavigateChange={props.onNavigateChange}
                        />,
                        // Only render ListDivider if not last item.
                        array.length - 1 === index ? "" :
                          <ListDivider
                            key={index + "_divider"} />
                      ])}
                    </ScrollableList>
                  </Card>
                </Cell>
              );
            })}
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

export default withTitle(CoursesPage, "Kurser");

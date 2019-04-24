import React, { lazy, useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { AppContext } from "../common/AppContext";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "fetch-suspense";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import { Headline5 } from "@material/react-typography";
import List from "@material/react-list";
import Sheltr from "@taito/react-sheltr";

import CourseItem from "./CourseItem";
import "./CoursesPage.scss";

// Lazy-load CoursePage.
const CoursePage = lazy(() => import("../courses/CoursePage"));

/**
 * CoursesPage component.
 */
function CoursesPage(props) {

  const { appBarTitle, setTitle } = useContext(AppContext);

  const courses = useFetch("http://localhost:3001/api/courses", {
    method: "GET", credentials: "include"
  });

  useEffect(() => {
    if (props.match.isExact) {
      if (appBarTitle !== "Kurser") {
        setTitle("Kurser");
      }
    }
  });

  function renderCourses() {
    function onMouseOver(event) {
      onMouse(event);
    }

    function onMouseOut(event) {
      onMouse(event, true);
    }

    // All this function does is adds or removes the "has-scrollbar" class from the correct list.
    function onMouse(event, isOut) {
      const element = event.target;
      Object.keys(courses).map(studentGroupId => {
        const courseListElement = document.getElementById(studentGroupId);
        if (courseListElement.contains(element)) {
          const hasVerticalScrollbar =
            courseListElement.scrollHeight > courseListElement.clientHeight;
          if (hasVerticalScrollbar) {
            if (isOut && courseListElement.classList.contains("has-scrollbar")) {
              courseListElement.classList.remove("has-scrollbar");
            } else if (!courseListElement.classList.contains("has-scrollbar")) {
              courseListElement.classList.add("has-scrollbar");
            }
          }
        }
        return null;
      });
    }

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
                    <ScrollableList
                      id={studentGroupId}
                      onMouseOver={onMouseOver}
                      onMouseOut={onMouseOut}
                    >
                      {studentGroupCourses.map((course, index, array) => [
                        <CourseItem
                          key={course.course_code}
                          listItem={course}
                          index={index}
                          array={array}
                          onNavigateChange={props.onNavigateChange}
                        />,
                        // Only render MarginDivider if not last item.
                        array.length - 1 === index ? "" :
                          <MarginDivider
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
    <Sheltr duration={200}>
      <Route
        path={`${props.match.path}/:code`}
        component={props => <CoursePage {...props} />}
      />
      <Route
        exact
        path={props.match.path}
        render={renderCourses}
      />
    </Sheltr>
  );
}

CoursesPage.propTypes = {
  onNavigateChange: PropTypes.func,
  match: PropTypes.object,
};

/**
 * CoursesPage styling.
 */
const ScrollableList = styled(List)`
  overflow-y: hidden;
  padding: 0 8px;
`;
const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 0 auto;
  
  ${ScrollableList}:hover {
    overflow-y: auto;
  }
  ${ScrollableList}::-webkit-scrollbar-track {
    margin-top: 4px;
  }
`;
const MarginDivider = styled.div`
  margin-top: 0.5rem;
`;

export default CoursesPage;

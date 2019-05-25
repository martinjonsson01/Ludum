import React, { useState, useContext, useEffect, Suspense } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import useFetch from "fetch-suspense";
import { AppContext } from "../common/AppContext";
import TabBar from "@material/react-tab-bar";
import Tab from "@material/react-tab";
import LinearProgress from "@material/react-linear-progress";
import { Headline3, Headline5 } from "@material/react-typography";
//import anime from "animejs";

import ErrorBoundary from "../common/ErrorBoundary";
import FeedPage from "./FeedPage";
import MatrixPage from "./MatrixPage";
import TestsPage from "./TestsPage";
import MaterialsPage from "./MaterialsPage";

/*
 * Component.
 */
function CoursePage({ location, history, match }) {

  const course = useFetch(
    `http://localhost:3001/api/courses/${match.params.code}`,
    { method: "GET", credentials: "include" }
  );

  const { appBarTitle, documentTitle, setTitle, theme } = useContext(AppContext);

  useEffect(() => {
    if (appBarTitle !== "" || documentTitle !== course.course_name) {
      setTitle(course.course_name, true);
    }
  });

  function getInitialIndex() {
    switch (location.pathname) {
      // eslint-disable-next-line indent
      case `/kurser/${match.params.code}/flode`: return 0;
      // eslint-disable-next-line indent
      case `/kurser/${match.params.code}/kursmaterial`: return 1;
      // eslint-disable-next-line indent
      case `/kurser/${match.params.code}/kursmatris`: return 2;
      // eslint-disable-next-line indent
      case `/kurser/${match.params.code}/prov`: return 3;
      // eslint-disable-next-line indent
      default: return -1;
    }
  }
  const [activeIndex, setActiveIndex] = useState(getInitialIndex());

  function onActiveIndexUpdate(index) {
    setActiveIndex(index);
    if (location.pathname !== `/kurser/${match.params.code}/flode` && index === 0)
      history.push(`/kurser/${match.params.code}/flode`);
    if (location.pathname !== `/kurser/${match.params.code}/kursmaterial` && index === 1)
      history.push(`/kurser/${match.params.code}/kursmaterial`);
    if (location.pathname !== `/kurser/${match.params.code}/kursmatris` && index === 2)
      history.push(`/kurser/${match.params.code}/kursmatris`);
    if (location.pathname !== `/kurser/${match.params.code}/prov` && index === 3)
      history.push(`/kurser/${match.params.code}/prov`);
  }

  return (
    <Container>
      <Banner>
        <BannerImage
          bannerurl={course.banner_url}
          tintcolor={course.accent_color_dark}
        />
        <DarkTint />
        <CourseTitle>{course.course_name}</CourseTitle>
        <TeacherName>{course.teacher_name}</TeacherName>
        <TeacherImage
          src={course.teacher_avatar_url}
          alt={course.teacher_name}
        />
      </Banner>
      <ThemedTabBar
        activeIndex={activeIndex}
        tintcolor={theme === "dark" ? course.accent_color_dark : course.accent_color}
        handleActiveIndexUpdate={onActiveIndexUpdate}>
        <Tab>
          <span className='mdc-tab__text-label'>Flöde</span>
        </Tab>
        <Tab>
          <span className='mdc-tab__text-label'>Kursmaterial</span>
        </Tab>
        <Tab>
          <span className='mdc-tab__text-label'>Kursmatris</span>
        </Tab>
        <Tab>
          <span className='mdc-tab__text-label'>Prov</span>
        </Tab>
      </ThemedTabBar>

      <ErrorBoundary>
        <Suspense fallback={<LinearProgress indeterminate={true} />}>
          <Switch>
            <Route
              path={`${match.path}/flode`}
              component={routeProps =>
                <FeedPage
                  courseId={course.id}
                  {...routeProps}
                  accentColor={theme === "dark" ? course.accent_color_dark : course.accent_color}
                />
              }
            />
            <Route
              path={`${match.path}/kursmaterial`}
              component={routeProps => <MaterialsPage {...routeProps} />}
            />
            <Route
              path={`${match.path}/kursmatris`}
              component={routeProps => <MatrixPage {...routeProps} />}
            />
            <Route
              path={`${match.path}/prov`}
              component={routeProps => <TestsPage {...routeProps} />}
            />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}

/*
 * Props.
 */
CoursePage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
};

/*
 * Styling.
 */
const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 0  auto 1.5rem auto;

  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0;
  }
`;
const Banner = styled.div`
  position: relative;
  height: 18rem;
  border-radius: 0  0 1rem 1rem;

  @media (max-width: 600px) {
    height: 10rem;
  }
`;
const BannerImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => `url(${props.bannerurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${props => `#${props.tintcolor}`};
  background-blend-mode: multiply;
  border-radius: 0  0 1rem 1rem;
`;
const DarkTint = styled.div`
  background-color: rgba(32,33,36,0.6);
  height: 18rem;
  border-radius: 0  0 1rem 1rem;

  @media (max-width: 600px) {
    height: 10rem;
  }
`;
const ThemedTabBar = styled(TabBar)`
  width: calc(100% - 2*1.5rem) !important;
  margin: 0 1.5rem;
  --mdc-theme-primary: ${props => `#${props.tintcolor}`};

  @media (max-width: 600px) {
    width: calc(100% - 2*1rem) !important;
    margin: 0 1rem;
  }

  .mdc-tab__text-label {
    font-size: 1rem;
    font-weight: 700;
  }
`;
const CourseTitle = styled(Headline3)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: white;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  font-family: Montserrat !important;

  @media (max-width: 600px) {
    font-size: 2rem !important;
    top: 1rem;
    left: 1rem;
    line-height: 2rem !important;
  }
`;
const TeacherName = styled(Headline5)`
  position: absolute;
  bottom: 6rem;
  left: 2rem;
  color: white;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  font-family: Montserrat !important;

  @media (max-width: 900px) {
    bottom: 5rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem !important;
    bottom: 2rem;
    left: 1rem;
  }
`;
const TeacherImage = styled.img`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover; /* Scale the image to cover element. */
  object-position: center; /* Center the image within the element. */

  @media (max-width: 900px) {
    height: 7rem;
    width: 7rem;
  }
  @media (max-width: 600px) {
    height: 5rem;
    width: 5rem;
    bottom: 1rem;
    right: 1rem;
  }
`;

export default CoursePage;

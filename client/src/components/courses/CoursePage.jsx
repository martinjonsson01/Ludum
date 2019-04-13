/* eslint-disable indent */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import useFetch from "fetch-suspense";
import { AppContext } from "../common/AppContext";
import TabBar from "@material/react-tab-bar";
import Tab from "@material/react-tab";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./CoursesPage.scss";
import FlowPage from "./FlowPage";
import MatrixPage from "./MatrixPage";
import TestsPage from "./TestsPage";
import MaterialsPage from "./MaterialsPage";

function CoursePage({ location, history, match }) {

  const course = useFetch(
    `http://localhost:3001/api/course/${match.params.code}`,
    { method: "GET", credentials: "include" }
  );

  const { title, setTitle } = useContext(AppContext);
  if (title !== course.course_name) {
    setTitle(course.course_name);
  }

  function getInitialIndex() {
    switch (location.pathname) {
      case `/kurser/${match.params.code}/flode`: return 0;
      case `/kurser/${match.params.code}/kursmaterial`: return 1;
      case `/kurser/${match.params.code}/kursmatris`: return 2;
      case `/kurser/${match.params.code}/prov`: return 3;
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
    <React.Fragment>
      <TabBar
        activeIndex={activeIndex}
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
      </TabBar>
      <TransitionGroup>
        <CSSTransition
          key={activeIndex}
          timeout={600}
          classNames="carouselTransition">
          <section className="grid-container fix-container">
            <Route
              path={`${match.path}/flode`}
              component={routeProps => <FlowPage {...routeProps} />}
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
          </section>
        </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  );
}

CoursePage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
};

export default CoursePage;

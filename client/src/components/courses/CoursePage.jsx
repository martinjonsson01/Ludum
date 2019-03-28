/* eslint-disable indent */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import useFetch from "fetch-suspense";
import TabBar from "@material/react-tab-bar";
import Tab from "@material/react-tab";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";

import "./CoursesPage.scss";

function CoursePage(props) {

  const { location, history, match } = props;

  const course = useFetch(
    `http://localhost:3001/api/course/${match.params.code}`,
    { method: "GET" }
  );

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

  function Flow() {
    return (
      <Grid>
        <Row>
          <Cell columns={12}>
            <Card className="full-height-tabbar">Flöde</Card>
          </Cell>
        </Row>
      </Grid>
    );
  }

  function Materials() {
    return (
      <Grid>
        <Row>
          <Cell columns={12}>
            <Card className="full-height-tabbar">Kursmaterial</Card>
          </Cell>
        </Row>
      </Grid>
    );
  }

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
              path={`${props.match.path}/flode`}
              component={routeProps => <Flow {...routeProps} />}
            />
            <Route
              path={`${props.match.path}/kursmaterial`}
              component={routeProps => <Materials {...routeProps} />}
            />
            <Route
              path={`${props.match.path}/kursmatris`}
              component={routeProps => <Flow {...routeProps} />}
            />
            <Route
              path={`${props.match.path}/prov`}
              component={routeProps => <Materials {...routeProps} />}
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

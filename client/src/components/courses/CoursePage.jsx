/* eslint-disable indent */
import React, { useState } from "react";
import PropTypes from "prop-types";
import TabBar from "@material/react-tab-bar";
import Tab from "@material/react-tab";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";

import "./CoursesPage.scss";
import Route from "react-router-dom/Route";

function CoursePage(props) {

  const { location, history } = props;
  function getInitialIndex() {
    switch (location.pathname) {
      case "/kurser/flode": return 0;
      case "/kurser/kursmaterial": return 1;
      case "/kurser/kursmatris": return 2;
      case "/kurser/prov": return 3;
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
    if (location.pathname !== "/kurser/flode" && index === 0) history.push("/kurser/flode");
    if (location.pathname !== "/kurser/kursmaterial" && index === 1) history.push("/kurser/kursmaterial");
    if (location.pathname !== "/kurser/kursmatris" && index === 2) history.push("/kurser/kursmatris");
    if (location.pathname !== "/kurser/prov" && index === 3) history.push("/kurser/prov");
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
              path={`${props.match.url}/flode`}
              component={routeProps => <Flow {...routeProps} />}>

            </Route>
            <Route
              path={`${props.match.url}/kursmaterial`}
              component={routeProps => <Materials {...routeProps} />}>

            </Route>
            <Route
              path={`${props.match.url}/kursmatris`}
              component={routeProps => <Flow {...routeProps} />}
            />
            <Route
              path={`${props.match.url}/prov`}
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

import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import Card from "@material/react-card";
import List from "@material/react-list";
import { Body1, Headline5 } from "@material/react-typography";

import "./OverviewPage.scss";

import NewsSummaryItem from "./NewsSummaryItem";
import FetchList from "../common/FetchList";
import CourseEventItem from "./CourseEventItem";

// eslint-disable-next-line no-unused-vars
function OverviewPage(props) {
  return (
    <Grid>
      <Row>
        {/** News */}
        <Cell columns={4}>
          <Card
            id="news"
            className="full-height overview-list">
            <Headline5 className="card-title">Nyheter</Headline5>
            <FetchList
              url="http://localhost:3001/api/getNews"
              listComponent={List}
              listItemComponent={NewsSummaryItem} />
          </Card>
        </Cell>
        {/** Course Events */}
        <Cell columns={4}>
          <Card className="full-height overview-list">
            <Headline5 className="card-title">Kurshändelser</Headline5>
            <FetchList
              url="http://localhost:3001/api/getCourseEvents"
              listComponent={List}
              listItemComponent={CourseEventItem} />
          </Card>
        </Cell>
        {/** Schedule */}
        <Cell columns={4}>
          <Card className="full-height overview-list">
            <Headline5 className="card-title">Schema</Headline5>
            <Body1>
              Work in progress
            </Body1>
          </Card>
        </Cell>
      </Row>
    </Grid>
  );
}

OverviewPage.propTypes = {
  null: PropTypes.any,
};

export default OverviewPage;

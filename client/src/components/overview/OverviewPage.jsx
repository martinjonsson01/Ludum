import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import Card from "@material/react-card";
import { Body1, Headline5 } from "@material/react-typography";
import LinearProgress from "@material/react-linear-progress";

import "./OverviewPage.scss";
import NewsSummary from "./NewsSummary";

// eslint-disable-next-line no-unused-vars
function OverviewPage(props) {
  return (
    <Grid>
      <Row>
        {/** News */}
        <Cell columns={4}>
          <Card
            id="news"
            className="full-height">
            <Headline5 className="card-title">Nyheter</Headline5>
            <Suspense fallback={<LinearProgress indeterminate={true} />}>
              <NewsSummary />
            </Suspense>
          </Card>
        </Cell>
        {/** Events */}
        <Cell columns={4}>
          <Card className="full-height">
            <Headline5 className="card-title">Händelser</Headline5>
            <Body1>
              uwu
            </Body1>
          </Card>
        </Cell>
        {/** Schedule */}
        <Cell columns={4}>
          <Card className="full-height">
            <Headline5 className="card-title">Schema</Headline5>
            <Body1>
              uwu
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

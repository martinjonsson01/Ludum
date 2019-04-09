import React from "react";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import withTitle from "../common/withTitle.jsx";

function SchedulePage() {
  return (
    <Grid>
      <Row>
        <Cell columns={12}>
          <Card className="full-height">
            Work-in-progress
          </Card>
        </Cell>
      </Row>
    </Grid>
  );
}

export default withTitle(SchedulePage, "Schema");

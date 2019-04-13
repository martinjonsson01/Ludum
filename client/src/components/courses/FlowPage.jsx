import React from "react";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";

function FlowPage() {
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

export default FlowPage;

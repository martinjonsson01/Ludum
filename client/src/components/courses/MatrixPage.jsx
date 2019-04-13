import React from "react";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";

function MatrixPage() {
  return (
    <Grid>
      <Row>
        <Cell columns={12}>
          <Card className="full-height-tabbar">Kursmatris</Card>
        </Cell>
      </Row>
    </Grid>
  );
}

export default MatrixPage;

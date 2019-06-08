import React from "react";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";

function MaterialsPage() {
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

export default MaterialsPage;

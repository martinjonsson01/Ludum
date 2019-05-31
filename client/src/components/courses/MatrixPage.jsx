import React from "react";
import { Grid, Row, Cell } from "@material/react-layout-grid";

import Modal from "../common/Modal";

function MatrixPage() {
  return (
    <Grid>
      <Row>
        <Cell columns={12}>
          <Modal initialBounds={{ width: 800, height: 600, top: 50, left: 100 }} />
        </Cell>
      </Row>
    </Grid>
  );
}

export default MatrixPage;

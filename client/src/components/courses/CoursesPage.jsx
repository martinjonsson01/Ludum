import React, { useState } from "react";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import Tab from "@material/react-tab";
import TabBar from "@material/react-tab-bar";

import "./CoursesPage.scss";

function CoursesPage() {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={setActiveIndex}>
      <Tab>
        <span className='mdc-tab__text-label'>One</span>
      </Tab>
      <Tab>
        <span className='mdc-tab__text-label'>One</span>
      </Tab>
    </TabBar>
  );
}

export default CoursesPage;

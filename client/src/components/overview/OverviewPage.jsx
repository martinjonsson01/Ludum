import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import Card from "@material/react-card";
import List, { ListDivider } from "@material/react-list";
import { Body1, Headline5 } from "@material/react-typography";
import withTitle from "../common/withTitle.jsx";


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import "./OverviewPage.scss";

import NewsSummaryItem from "./NewsSummaryItem";
import FetchList from "../common/FetchList";
import CourseEventItem from "./CourseEventItem";




// eslint-disable-next-line no-unused-vars
function OverviewPage(props) {
    const calendarRef = useRef(null);
    useEffect(() => {
      new Calendar(calendarRef.current, {
        plugins: [googleCalendarPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
        googleCalendarApiKey: "AIzaSyC06FeHq3RykmYYInvo8U_nezBwAyOpzlc",
        events: {
          googleCalendarId: "ga.lbs.se_dtl9te7o29dalj74doi2anl1kk@group.calendar.google.com"
        }
      });
    }, [calendarRef]);
  
    
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
              url="http://localhost:3001/api/news"
              listComponent={List}
              listItemComponent={NewsSummaryItem}
              listDivider={ListDivider}
              onNavigateChange={props.onNavigateChange} />
          </Card>
        </Cell>
        {/** Course Events */}
        <Cell columns={4}>
          <Card className="full-height overview-list">
            <Headline5 className="card-title">Kurshändelser</Headline5>
            <FetchList
              url="http://localhost:3001/api/courses/events"
              listComponent={List}
              listDivider={ListDivider}
              listItemComponent={CourseEventItem} />
          </Card>
        </Cell>
        {/** Schedule */}
        <Cell columns={4}>
          <Card className="full-height overview-list">
          
            <Headline5 className="card-title">Schema</Headline5>
            <Body1 className="DayOverview">
            <FullCalendar
              minTime="08:00"
              ref={calendarRef}
              id="calendar"
              height="auto"
              defaultView="timeGridDay"
              plugins={[googleCalendarPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              googleCalendarApiKey="AIzaSyC06FeHq3RykmYYInvo8U_nezBwAyOpzlc"
              events={{
                googleCalendarId: "ga.lbs.se_dtl9te7o29dalj74doi2anl1kk@group.calendar.google.com"
              }}
              />
            </Body1>
          </Card>
        </Cell>
      </Row>
    </Grid>
  );
}

OverviewPage.propTypes = {
  onNavigateChange: PropTypes.func,
};

export default withTitle(OverviewPage, "Översikt");

import React, { useEffect, useRef } from "react";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import withTitle from "../common/withTitle.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

function SchedulePage() {
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
        <Cell columns={12}>
          <Card className="full-height">
            <FullCalendar
              ref={calendarRef}
              id="calendar"
              defaultView="dayGridMonth"
              plugins={[googleCalendarPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              googleCalendarApiKey="AIzaSyC06FeHq3RykmYYInvo8U_nezBwAyOpzlc"
              events={{
                googleCalendarId: "ga.lbs.se_dtl9te7o29dalj74doi2anl1kk@group.calendar.google.com"
              }}
            />
          </Card>
        </Cell>
      </Row>
    </Grid>
  );
}

export default withTitle(SchedulePage, "Schema");

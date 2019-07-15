import React from "react";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import withTitle from "../common/withTitle.jsx";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

function SchedulePage() {
  var calendarEl = document.getElementById('calendar');
  let calendar = new Calendar(calendarEl, {
    plugins: [googleCalendarPlugin,dayGridPlugin, timeGridPlugin, interactionPlugin],
    googleCalendarApiKey: 'AIzaSyC06FeHq3RykmYYInvo8U_nezBwAyOpzlc',
    events: {
      googleCalendarId: 'https://calendar.google.com/calendar/b/1?cid=Z2EubGJzLnNlX2R0bDl0ZTdvMjlkYWxqNzRkb2kyYW5sMWtrQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20'
    }
  });
  return (
    <Grid>
      <Row>
        <Cell columns={12}>
          <Card className="full-height">
           <FullCalendar defaultView="dayGridMonth" plugins={[ googleCalendarPlugin,dayGridPlugin, timeGridPlugin, interactionPlugin ]} />;
          </Card>
        </Cell>
      </Row>
    </Grid>
  );
}

export default withTitle(SchedulePage, "Schema");

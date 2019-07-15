import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "@material/react-card";
import { Grid, Row, Cell } from "@material/react-layout-grid";
import withTitle from "../common/withTitle.jsx";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import svLocale from "@fullcalendar/core/locales/sv";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function SchedulePage() {
  const calendarRef = useRef(null);
  useEffect(() => {
    new Calendar(calendarRef.current, {
      plugins: [googleCalendarPlugin, timeGridPlugin, interactionPlugin],
      googleCalendarApiKey: "AIzaSyC06FeHq3RykmYYInvo8U_nezBwAyOpzlc",
      events: {
        googleCalendarId: "ga.lbs.se_dtl9te7o29dalj74doi2anl1kk@group.calendar.google.com"
      }
    });
  }, [calendarRef]);

  function onEventClick(info) {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info);
  }

  return (
    <Grid>
      <Row>
        <Cell columns={12}>
          <Card className="full-height">
            <StyleWrapper>
              <FullCalendar
                ref={calendarRef}
                id="calendar"
                locale={svLocale}
                defaultView="timeGridWeek"
                minTime="08:30"
                maxTime="16:00"
                contentHeight="600"
                plugins={[googleCalendarPlugin, timeGridPlugin, interactionPlugin]}
                googleCalendarApiKey="AIzaSyC06FeHq3RykmYYInvo8U_nezBwAyOpzlc"
                nowIndicator={true}
                allDaySlot={false}
                hiddenDays={[0, 6]}
                eventClick={onEventClick}
                slotLabelFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  omitZeroMinute: false,
                  meridiem: "short"
                }}
                views={{
                  timeGridFiveDay: {
                    type: "timeGrid",
                    buttonText: "5 day"
                  }
                }}
                events={{
                  googleCalendarId: "ga.lbs.se_dtl9te7o29dalj74doi2anl1kk@group.calendar.google.com"
                }}
                eventTimeFormat={{
                  hour: "2-digit", //2-digit, numeric
                  minute: "2-digit", //2-digit, numeric
                  meridiem: false, //lowercase, short, narrow, false (display of AM/PM)
                  hour12: false //true, false
                }}
              />
            </StyleWrapper>
          </Card>
        </Cell>
      </Row>
    </Grid>
  );
}

const StyleWrapper = styled.div`
  font-family: Roboto, sans-serif;
  color: var(--mdc-theme-on-background) !important;

  .fc-today {
    background: var(--mdc-theme-primary-opacity-10) !important;
  }
  .fc-event {
    background: var(--mdc-theme-primary) !important;
    color: var(--mdc-theme-on-primary) !important;
    border-color: var(--mdc-theme-border) !important;
  }
  .fc-widget-content {
    border-style: solid !important;
    border-color: var(--mdc-theme-border);
  }
  .fc-day, .fc-axis {
    border-style: solid;
    border-width: 1px;
    border-top-width: 0;
    border-bottom-width: 0;
    border-color: var(--mdc-theme-border);
  }
  .fc-divider, .fc-day-header, .fc-row, .fc-head-container {
    border-color: transparent !important;
    background: transparent !important;
  }
  & tr {
    height: 3rem;
  }
  .fc-axis.fc-time.fc-widget-content span {
    margin-top: -100px;
  }
`;

export default withTitle(SchedulePage, "Schema");

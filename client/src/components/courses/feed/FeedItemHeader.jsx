import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MaterialIcon from "@material/react-material-icon";
import { Headline6 } from "@material/react-typography";

import { formatDate, formatDueDate } from "../../../Util";
import DateText from "../../common/DateText";

function FeedItemHeader({ event, onClick, accentColor }) {

  function getIcon() {
    if (event.type === "assignment") {
      // If turned in.
      if (event.turned_in_at) {
        return "assignment_turned_in";
      } else { // Not turned in.
        const now = new Date();
        const dueDate = new Date(event.due_at);
        // If late.
        if (now > dueDate) {
          return "assignment_late";
        } else { // Not late.
          return "assignment";
        }
      }
    }
    if (event.type === "coursematerial") {
      return "book";
    }
    return event.type;
  }

  var iconColor;
  var backgroundColor = "none";
  var buttonBackgroundColor = "none";
  var turnInTextColor = "var(--mdc-theme-text-subtitle)";
  // If not announcement.
  if (event.type !== "announcement") {
    // If turned in.
    if (event.turned_in_at) {
      const turnedInDate = new Date(event.turned_in_at);
      const dueDate = new Date(event.due_at);
      if (turnedInDate > dueDate) {
        // LATE turn-in. #f57f17
        backgroundColor = "var(--mdc-theme-warning)";
        iconColor = "var(--mdc-theme-on-warning)";
      } else {
        // ALL IS GOOD. Turned in. rgba(255, 255, 255, 0.10)
        backgroundColor = "var(--mdc-theme-background-disabled)";
        iconColor = "var(--mdc-theme-on-background)";
      }
    } else { // Not turned in.
      const now = new Date();
      const dueDate = new Date(event.due_at);
      if (now > dueDate) {
        // LATE NO TURN-IN. #b00020
        // ! ! !  S O U N D  T H E  A L A R M S  ! ! !
        backgroundColor = "var(--mdc-theme-error)";
        iconColor = "var(--mdc-theme-on-error)";
        buttonBackgroundColor = "var(--mdc-theme-warning)";
        turnInTextColor = "var(--mdc-theme-text-title)";
      } else {
        // ALL IS GOOD. Not turned in. #1b8c9b
        backgroundColor = "var(--mdc-theme-primary)";
        iconColor = `#${accentColor}`;
        buttonBackgroundColor = "var(--mdc-theme-primary-opacity-10)";
      }
    }
  }

  return (
    <Meta
      type={event.type}
      onClick={onClick}
      backgroundcolor={buttonBackgroundColor}
    >
      {/** Icon */}
      <Icon
        type={event.type}
        icon={getIcon()}
        iconcolor={iconColor}
        backgroundcolor={backgroundColor}
      />
      {/* If event type is announcement, put publish and edit date up here. */}
      {event.type === "announcement" &&
        /** Publish and edit date */
        <DateText
          publishDate={event.created_at}
          editDate={event.updated_at}
          formatter={formatDate}
          prefix="Publicerad "
        />
      }
      {event.type !== "announcement" &&
        /** Title */
        <Title>{event.title}</Title>
      }
      {/* This margin seperates the above from the below. */}
      <EmptyMargin />
      {event.type === "assignment" &&
        (event.turned_in_at ?
          "Inlämnad"
          :
          /** Turn-in date */
          <DateText
            publishDate={event.due_at}
            formatter={formatDueDate}
            prefix="Inlämning "
            textColor={turnInTextColor}
          />
        )
      }
    </Meta>
  );
}

/*
 * Props.
 */
FeedItemHeader.propTypes = {
  event: PropTypes.object.isRequired,
  accentColor: PropTypes.string,
  onClick: PropTypes.func,
};

/*
 * Styles.
 */
const Meta = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${props => props.type !== "announcement" ? "-1rem -1.5rem 0 -1.5rem" : "-1rem 0 0 0"};
  padding: ${props => props.type !== "announcement" ? "0.5rem 1.5rem" : "1rem 0 0 0"};
  color: var(--mdc-theme-on-background);
  background: ${props => props.backgroundcolor};
  min-height: 3.75rem;

  transition-delay: 0ms;
  transition-duration: 50ms;
  transition-property: background;
  
  &:hover {
    background: ${props => props.type !== "announcement" ? "var(--mdc-theme-primary-opacity-20)" : "none"};
    cursor: ${props => props.type !== "announcement" ? "pointer" : "inherit"};
  }
`;
const Icon = styled(MaterialIcon)`
  text-align: center;
  vertical-align: middle;
  line-height: 2.5rem !important; 
  width: 2.5rem;
  height: 2.5rem;
  font-size: ${props => props.type === "announcement" ? "2.5rem" : "1.5rem"} !important;
  margin-right: 1rem;
  background: ${props => props.backgroundcolor};
  border-radius: ${props => props.type !== "announcement" ? "50%" : "none"};
  color: ${props => props.iconcolor};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const EmptyMargin = styled.div`
  flex-grow: 1;
  flex-basis: 0.000000001px;
`;
const Title = styled(Headline6)`
  color: var(--mdc-theme-title);
  font-family: Montserrat, Roboto, sans-serif !important;
  font-weight: 500 !important;
`;

export default FeedItemHeader;

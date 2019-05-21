import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "@material/react-card";
import MaterialIcon from "@material/react-material-icon";
import { Body1 } from "@material/react-typography";

import MaterialsList from "./MaterialsList";
import CommentBox from "../comment/CommentBox";
import { formatDate } from "../../Util";

/*
 * Component.
 */
function AnnouncementItem({ event, accentColor }) {

  const publishDate = formatDate(new Date(event.created_at));
  const editDate = formatDate(new Date(event.updated_at));

  return (
    <li key={event.content}>
      <StyledCard>
        <Content>
          <Icon icon="announcement" iconcolor={accentColor} />
          <Body>{event.content}</Body>
          <Dates>
            {/** Publish date */}
            <DateText>{publishDate}</DateText>
            {/** Edit date */}
            {editDate === publishDate ? "" :
              <i><DateText>Redigerad {editDate}</DateText></i>
            }
          </Dates>
        </Content>
        <MaterialsList
          event={event}
          accentColor={accentColor}
        />
        <Divider />
        <CommentBox
          accentColor={accentColor}
          commentUrl={`http://localhost:3001/api/comments/announcement/${event.id}`}
        />
      </StyledCard>
    </li>
  );
}

/*
 * Props.
 */
AnnouncementItem.propTypes = {
  event: PropTypes.object.isRequired,
  accentColor: PropTypes.string,
};

/*
 * Styles.
 */
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
const Icon = styled(MaterialIcon)`
  font-size: 2rem !important;
  color: ${props => `#${props.iconcolor}`};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Body = styled(Body1)`
  margin: auto;
  margin-left: 1rem;
  height: fit-content;
  flex-grow: 1;
`;
const Dates = styled.div`
  margin-left: 2rem;
`;
const DateText = styled(Body1)`
  color: var(--mdc-theme-text-subtitle);
`;
const Divider = styled.div`
  height: 1px;
  margin: 1.5rem -1.5rem 0 -1.5rem;
  background: var(--mdc-theme-border);
`;

export default AnnouncementItem;

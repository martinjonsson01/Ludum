import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Card from "@material/react-card";
import MaterialIcon from "@material/react-material-icon";
import { Body1, Headline6 } from "@material/react-typography";

import MaterialsList from "./MaterialsList";
import CommentBox from "../comment/CommentBox";
import { formatDate } from "../../Util";

/*
 * Component.
 */
function FeedItem({ event, accentColor }) {

  const publishDate = formatDate(new Date(event.created_at));
  const editDate = formatDate(new Date(event.updated_at));

  return (
    <li key={event.content}>
      <StyledCard>
        <Meta type={event.type}>
          <Icon
            icon={event.type === "coursematerial" ? "book" : event.type}
            iconcolor={accentColor}
            type={event.type}
          />
          {event.type === "announcement" &&
            /** Publish date */
            <DateText>{publishDate}</DateText>
          }
          {event.type !== "announcement" &&
            /** Title */
            <Title>{event.title}</Title>
          }
          <EmptyMargin />
          {/** Edit date */}
          {editDate === publishDate ? "" :
            <i><DateText>Redigerad {editDate}</DateText></i>
          }
        </Meta>
        {event.type !== "announcement" && <Divider />}
        <Body>{event.content}</Body>
        <StyledMaterialsList
          event={event}
          accentColor={accentColor}
        />
        <Divider />
        <CommentBox
          accentColor={accentColor}
          commentUrl={`http://localhost:3001/api/comments/${event.type}/${event.id}`}
        />
      </StyledCard>
    </li>
  );
}

/*
 * Props.
 */
FeedItem.propTypes = {
  event: PropTypes.object.isRequired,
  accentColor: PropTypes.string,
};

/*
 * Styles.
 */
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
`;
const Meta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${props => props.type !== "announcement" ? "-1rem -1.5rem 0 -1.5rem" : "0"};
  padding: ${props => props.type !== "announcement" ? "0.5rem 1.5rem" : "0"};
  
  &:hover {
    background: ${props => props.type !== "announcement" ? "var(--mdc-theme-surface)" : "none"};
    cursor: pointer;
  }
`;
const Icon = styled(MaterialIcon)`
  text-align: center;
  vertical-align: middle;
  line-height: 2.5rem !important; 
  width: 2.5rem;
  height: 2.5rem;
  font-size: ${props => props.type !== "announcement" ? "1.5rem" : "2.5rem"} !important;
  margin-right: 1rem;
  background: ${props => props.type !== "announcement" ? "var(--mdc-theme-primary)" : "none"};
  border-radius: ${props => props.type !== "announcement" ? "50%" : "none"};
  color: ${props => `#${props.iconcolor}`};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const EmptyMargin = styled.div`
  flex-grow: 1;
  flex-basis: 0.000000001px;
`;
const Body = styled(Body1)`
  height: fit-content;
  margin-top: 0.5rem;
  flex-grow: 1;
`;
const StyledMaterialsList = styled(MaterialsList)`
  margin-bottom: 1.5rem;
`;
const Title = styled(Headline6)`
  color: var(--mdc-theme-title);
  font-weight: 500 !important;
`;
const DateText = styled(Body1)`
  color: var(--mdc-theme-text-subtitle);
  font-size: 0.9375rem !important;
`;
const Divider = styled.div`
  height: 1px;
  margin: 0 -1.5rem;
  background: var(--mdc-theme-border);
`;

export default FeedItem;

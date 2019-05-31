import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MaterialIcon from "@material/react-material-icon";
import { Body1, Headline6 } from "@material/react-typography";

import MaterialsList from "./MaterialsList";
import CommentBox from "../comment/CommentBox";
import { formatDate, formatDueDate } from "../../Util";
import Modal from "../common/Modal";
import DateText from "../common/DateText";

/*
 * Component.
 */
function FeedItem({ event, accentColor }) {

  const [expandData, setExpandData] = useState(null);
  const [fullSize, setFullSize] = useState(false);
  const itemRef = useRef();

  function expandItem() {
    if (expandData) {
      // Update size state.
      setFullSize(false);
    } else if (itemRef.current) {
      const bounds = itemRef.current.getBoundingClientRect();
      // Pass FeedItems bounds rect to modal.
      setExpandData(bounds);
      // Update size state.
      setFullSize(true);
    }
  }

  function closeItem() {
    // Hide modal component.
    setExpandData(null);
  }

  function NormalFeedItem() {
    return (
      <StyledCard
        className="mdc-card"
        key={event.content}
        ref={itemRef}
      >
        <Meta
          type={event.type}
          onClick={expandItem}
        >
          {/** Icon */}
          <Icon
            icon={event.type === "coursematerial" ? "book" : event.type}
            iconcolor={accentColor}
            type={event.type}
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
            /** Turn-in date */
            <DateText
              publishDate={event.due_at}
              formatter={formatDueDate}
              prefix="Inlämning "
            />
          }
        </Meta>
        {event.type !== "announcement" && <Divider />}
        {/* If event type is not announcement, put publish and edit date down here. */}
        {event.type !== "announcement" &&
          /** Publish and edit date */
          <DateTextWithMargins
            publishDate={event.created_at}
            editDate={event.updated_at}
            formatter={formatDate}
            prefix="Publicerad "
          />
        }
        {/** Body */}
        <Body>{event.content}</Body>
        {/** Materials */}
        <StyledMaterialsList
          event={event}
          accentColor={accentColor}
        />
        <Divider />
        {/** Comments */}
        <CommentBox
          accentColor={accentColor}
          commentUrl={`http://localhost:3001/api/comments/${event.type}/${event.id}`}
        />
      </StyledCard>
    );
  }

  return (
    expandData ?
      <React.Fragment>
        <Modal
          key={event.content}
          fullSize={fullSize}
          setFullSize={setFullSize}
          initialBounds={expandData}
          onScrimClick={closeItem}
        >
          <NormalFeedItem />
        </Modal>
        <Placeholder bounds={expandData} />
      </React.Fragment>
      :
      <NormalFeedItem />
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
const StyledCard = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
`;
const Placeholder = styled.div`
  height: ${props => props.bounds.height}px;
  width: ${props => props.bounds.width}px;
`;
const Meta = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${props => props.type !== "announcement" ? "-1rem -1.5rem 0 -1.5rem" : "0"};
  padding: ${props => props.type !== "announcement" ? "0.5rem 1.5rem" : "0"};
  color: var(--mdc-theme-on-background);
  
  &:hover {
    background: ${props => props.type !== "announcement" ? "var(--mdc-theme-surface)" : "none"};
    cursor: ${props => props.type !== "announcement" ? "pointer" : "inherit"};
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
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;
const StyledMaterialsList = styled(MaterialsList)`
  margin-bottom: 0.5rem;
`;
const Title = styled(Headline6)`
  color: var(--mdc-theme-title);
  font-family: Montserrat, Roboto, sans-serif !important;
  font-weight: 500 !important;
`;
const DateTextWithMargins = styled(DateText)`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;
const Divider = styled.div`
  height: 1px;
  margin: 0 -1.5rem;
  background: var(--mdc-theme-border);
`;

export default FeedItem;

import React, { useState, useRef, Suspense } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LinearProgress from "@material/react-linear-progress";
import { Body1 } from "@material/react-typography";

import MaterialsList from "../MaterialsList";
import CommentBox from "../../comment/CommentBox";
import { formatDate } from "../../../Util";
import Modal from "../../common/Modal";
import DateText from "../../common/DateText";
//import WorkArea from "../WorkArea";
import FeedItemHeader from "./FeedItemHeader";

/*
 * Component.
 */
function FeedItem({ event, accentColor }) {

  const [expandData, setExpandData] = useState(null);
  // fullSize is used to control the opening and closing of the modal FeedItem.
  const [fullSize, setFullSize] = useState(false);
  // assignmentModalIsOpen is used to get the current status of the modal FeedItem.
  const [assignmentModalIsOpen, setAssignmentModalIsOpen] = useState(false);
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
    // Update modal state.
    setAssignmentModalIsOpen(false);
    // Hide modal component.
    setExpandData(null);
  }

  function onModalOpen() {
    // Update modal state if event is assignment.
    if (event.type === "assignment") {
      setAssignmentModalIsOpen(true);
    }
  }

  function getBorderColor() {
    // If not announcement.
    if (event.type !== "announcement") {
      // If not turned in.
      if (!event.turned_in_at) {
        const now = new Date();
        const dueDate = new Date(event.due_at);
        if (now > dueDate) {
          // LATE NO TURN-IN.
          // ! ! !  S O U N D  T H E  A L A R M S  ! ! !
          return "var(--mdc-theme-warning)";
        }
      }
    }
    // Otherwise, no custom border color.
    return null;
  }

  // Both assignmentModalIsOpen and fullSize need to be true for the assignment components to render.
  const renderFullAssignment = (assignmentModalIsOpen && fullSize);

  function NormalFeedItem() {
    return (
      <StyledCard
        className="mdc-card"
        key={event.content}
        ref={itemRef}
        bordercolor={getBorderColor()}
      >
        {/** Header */}
        <FeedItemHeader
          event={event}
          accentColor={accentColor}
          onClick={expandItem}
        />
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
          materialUrls={event.material_urls}
          accentColor={accentColor}
        />
        {/** Divider */}
        {renderFullAssignment && <Divider />}
        {/*event.type === "assignment" && renderFullAssignment && (
          /** Work area *
          <WorkArea

          />
        )*/}
        {/** Divider */}
        <Divider />
        {/** Comments */}
        <Suspense fallback={<StyledLinearProgress indeterminate={true} />}>
          {renderFullAssignment ?
            <CommentBox
              accentColor={accentColor}
              commentUrl={`http://localhost:3001/api/comments/${event.type}/${event.id}/private`}
              buttonPrefix={(singular) => singular ? "privat" : "privata"}
            />
            :
            <CommentBox
              accentColor={accentColor}
              commentUrl={`http://localhost:3001/api/comments/${event.type}/${event.id}`}
            />
          }
        </Suspense>
      </StyledCard>
    );
  }

  /**
   * Wraps the normal feed item with a div containing custom border-styling, if needed.
   */
  function CustomBorderedNormalFeedItem() {
    const borderColor = getBorderColor();
    return borderColor ?
      <CustomBorder bordercolor={borderColor}>
        <NormalFeedItem />
      </CustomBorder>
      :
      <NormalFeedItem />;
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
          onOpen={onModalOpen}
        >
          <CustomBorderedNormalFeedItem />
        </Modal>
        <Placeholder bounds={expandData} />
      </React.Fragment>
      :
      <CustomBorderedNormalFeedItem />
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
const CustomBorder = styled.div`
  --mdc-theme-border: ${props => props.bordercolor};
  
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
`;
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
const Body = styled(Body1)`
  height: fit-content;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;
const StyledMaterialsList = styled(MaterialsList)`
  margin-bottom: 0.5rem;
`;
const StyledLinearProgress = styled(LinearProgress)`
  margin: 0.5rem -1.5rem 0;
  width: auto !important;
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

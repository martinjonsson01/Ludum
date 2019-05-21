import React, { useContext, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Body1, Headline6 } from "@material/react-typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import { formatDate } from "../../Util";
import { AppContext } from "../common/AppContext";

/**
 * Component.
 */
function CommentItem({ comment, toggleContextMenu, ellipsis }) {

  const { user } = useContext(AppContext);
  const publishDate = formatDate(new Date(comment.created_at));
  const editDate = formatDate(new Date(comment.updated_at));

  const commentRef = useRef();
  const contextButtonRef = useRef();

  useLayoutEffect(() => {
    const commentElement = commentRef.current;
    commentElement.addEventListener("contextmenu", openContextMenu);
    // Cleanup.
    return () => {
      commentElement.removeEventListener("contextmenu", openContextMenu);
    };
  });

  function openContextMenu(event) {
    event.preventDefault();
    toggleContextMenu(comment, contextButtonRef);
  }

  function toggleContextMenuWithData() {
    toggleContextMenu(comment, contextButtonRef);
  }

  return (
    <Comment
      ref={commentRef}
      ispostedbycurrentuser={user.sub === comment.user_id}
    >
      {/** User avatar */}
      <UserImage
        src={comment.avatar_url}
        alt={comment.user_name}
      />
      <Content>
        <Author>
          {/** User name */}
          <AuthorName>{comment.user_name}</AuthorName>
          {/** Post date */}
          <DateText>{publishDate}</DateText>
          {/** Edit date */}
          {editDate === publishDate ? "" :
            <i><DateText> Redigerad {editDate}</DateText></i>
          }
        </Author>
        {/** Comment body */}
        <Body ellipsis={ellipsis}>{comment.body}</Body>
      </Content>
      <EmptyMargin />
      {/** "More" button */}
      <StyledIconButton
        onClick={toggleContextMenuWithData}
        buttonRef={contextButtonRef}
      >
        <Icon>more_vert</Icon>
      </StyledIconButton>
    </Comment>
  );
}

/**
 * Props.
 */
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  toggleContextMenu: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  ellipsis: PropTypes.any,
};

/**
 * Styling.
 */
const StyledIconButton = styled(IconButton)`
  width: 3rem;
  height: 3rem;
  display: none;
  opacity: 0;
  color: var(--mdc-theme-on-background) !important;
`;
const Comment = styled.section`
  position: relative;
  padding: 0 1.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: row;

  /*&:before {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    content: "";
    
    transition: opacity 15ms linear, background-color 15ms linear;
    z-index: 1;

    top: -1rem;
    left: 0;
    width: 100%;
    height: calc(100% + 1rem);

    background-color: var(--mdc-theme-primary);
  }
  &:hover:before {
    opacity: 0.05;
  }*/

  &:hover ${StyledIconButton}{
    /** Only show "More" button if comment was posted by currently signed in user. */
    display: ${props => props.ispostedbycurrentuser ? "block" : "none"};
    opacity: ${props => props.ispostedbycurrentuser ? 0.8 : 0};
  }
`;
const EmptyMargin = styled.div`
  flex-grow: 1;
  flex-basis: 0.000000001px;
`;
const UserImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.25rem 1rem 0 0;
  border-radius: 50%;
  object-fit: cover; /* Scale the image to cover element. */
  object-position: center; /* Center the image within the element. */
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const Author = styled.div`
  display: flex;
  height: 1.5rem;
  flex-direction: row;
  align-items: center;
`;
const AuthorName = styled(Headline6)`
  color: var(--mdc-theme-text-title-dark);
  font-size: 0.9em !important;
  font-family: Montserrat !important;
  font-weight: 600 !important;
  line-height: 1em !important;
  margin-right: 0.5rem;
`;
const DateText = styled(Body1)`
  color: var(--mdc-theme-text-subtitle);
  font-size: 0.9em !important;
  line-height: 1em !important;
  margin-right: 0.5rem;
`;
const Body = styled(Body1)`
  font-size: 0.9em !important;

  display: ${props => props.ellipsis ? "-webkit-box" : "block"};
  -webkit-line-clamp: ${props => props.ellipsis ? 3 : "none"};
  -webkit-box-orient: ${props => props.ellipsis ? "vertical" : "none"};  
  overflow: ${props => props.ellipsis ? "hidden" : "auto"};
`;

export default CommentItem;

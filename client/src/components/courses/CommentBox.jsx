import React, { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "fetch-suspense";
import { Body2 } from "@material/react-typography";
import TextareaAutosize from "react-autosize-textarea";
import Button from "@material/react-button";
import axios from "axios";

import "@material/react-button/index.scss";
import "@material/react-icon-button/index.scss";

import CommentItem from "./CommentItem";
import { AppContext } from "../common/AppContext";

/**
 * Component.
 */
function CommentBox({ accentColor, commentUrl }) {

  const comments = useFetch(commentUrl, {
    method: "GET", credentials: "include"
  });

  const { user } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const [writingComment, setWritingComment] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  const textareaRef = useRef();

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function updateCommentText(event) {
    setCommentText(event.currentTarget.value);
  }

  function startWritingComment() {
    if (!writingComment) {
      setWritingComment(true);
    }
  }

  function stopWritingComment() {
    if (writingComment) {
      setWritingComment(false);
      // Clear textarea.
      setCommentText("");
    }
  }

  async function submitComment() {
    setPostLoading(true);
    try {
      const result = await axios({
        method: "post",
        url: commentUrl,
        withCredentials: true,
        data: { message: commentText }
      });

      // Add new comment to comments array.
      if (comments) {
        comments.push(result.data);
      }

      setPostLoading(false);
      setWritingComment(false);
      // Clear textarea.
      setCommentText("");
    } catch (error) {
      // Handle error and inform user.

      setPostLoading(false);
      // Clear textarea.
      setCommentText("");
    }
  }

  return (
    <Box accentcolor={accentColor}>
      {comments ?
        <ExpandButton
          onClick={toggleExpanded}>
          <ExpandText>{`${comments.length} kommentarer`}</ExpandText>
        </ExpandButton>
        : ""
      }
      <Comments>
        {comments ?
          expanded ?
            comments.map(comment => (
              <CommentItem
                key={comment.body + comment.user_name + comment.updated_at}
                comment={comment}
              />
            ))
            :
            <CommentItem
              key={comments[comments.length - 1].body}
              comment={comments[comments.length - 1]}
            />
          :
          ""}
      </Comments>
      {comments ? <Divider /> : ""}
      <CommentArea>
        <UserImage
          src={user.picture}
          alt={user.name}
        />
        <InputArea>
          <StyledTextarea
            value={commentText}
            onChange={updateCommentText}
            async={true}
            placeholder="Kommentera ..."
            onClick={startWritingComment}
            writing={writingComment ? 1 : 0}
            ref={textareaRef}
            accentcolor={accentColor}
          />
          {writingComment ?
            <ButtonArea>
              <StyledButton onClick={stopWritingComment}>Avbryt</StyledButton>
              <StyledButton
                onClick={submitComment}
                raised
                disabled={postLoading || !commentText}>
                {postLoading ? "Lägger upp ..." : "Inlägg"}
              </StyledButton>
            </ButtonArea>
            : ""
          }
        </InputArea>

      </CommentArea>
    </Box>
  );
}

/**
 * Props.
 */
CommentBox.propTypes = {
  commentUrl: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
};

/**
 * Styling.
 */
const ExpandButton = styled.button`
  margin: 1rem 1.5rem 0 1.5rem;
`;
const Box = styled.section`
  margin: 0 -1.5rem -1.5rem -1.5rem;

  ${ExpandButton}:hover p {
    color: ${props => "#" + props.accentcolor};
  }
`;
const Comments = styled.ul`
  
`;
const ExpandText = styled(Body2)`
  margin-bottom: 1rem;
`;
const Divider = styled.div`
  height: 1px;
  background: var(--mdc-theme-border);
`;
const StyledTextarea = styled(TextareaAutosize)`
  background: transparent;
  color: var(--mdc-theme-on-surface);
  flex-grow: 1;
  cursor: text;

  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none; /* Remove the resize handle on the bottom right. */

  font-family: Roboto, sans-serif;
  font-size: 0.9rem;

  &::placeholder {
    color: ${props => props.writing ? "" : "#" + props.accentcolor};
  }
`;
const CommentArea = styled.div`
  display: flex;
  min-height: 5.25rem;
  flex-direction: row;
  align-items: center;
  padding: 1.5rem 1.5rem;
`;
const UserImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  align-self: flex-start;
  margin: 0.5rem 1rem 0 0;
  border-radius: 50%;
`;
const InputArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const ButtonArea = styled.div`
  align-self: flex-end;
  margin-left: 1rem;
  
  .mdc-button:hover::before {
    opacity: 0.1;
  }
`;
const StyledButton = styled(Button)`
  text-transform: none !important;
  font-family: Montserrat, sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  border-radius: 0.0625rem !important;
  margin-left: 1rem;
  min-width: 5.5rem !important;
  color: ${props => props.raised ? "var(--mdc-theme-on-primary)" : "var(--mdc-theme-link)"} !important;
`;

export default CommentBox;

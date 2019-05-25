import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { Body2 } from "@material/react-typography";

import CommentItem from "./CommentItem";
import CommentContextMenu from "./CommentContextMenu";
import MultilineTextInput from "../common/MultilineTextInput";

/**
 * Component.
 */
function CommentList({ comments, setComments, accentColor, setError }) {

  const [contextComment, setContextComment] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState([]);

  const contextCommentRef = useRef();

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function toggleContextMenu(comment, commentRef) {
    contextCommentRef.current = commentRef.current;
    setContextComment(contextComment ? null : comment);
  }

  function closeContextMenu(event) {
    if (event && contextCommentRef.current) {
      if (contextCommentRef.current.contains(event.target)) {
        return;
      }
    }
    setContextComment(null);
  }

  async function deleteComment(comment) {
    await axios({
      method: "delete",
      url: `http://localhost:3001/api/comments/${comment.id}`,
      withCredentials: true
    });

    // Remove comment from comments array.
    if (comments) {
      // Find index of comment.
      var index = comments.indexOf(comment);
      if (index > -1) {
        // Use splice to remove item at comment index.
        comments.splice(index, 1);
      }
    }
  }

  function editComment(comment) {
    setEditing(editing => editing.concat(comment.id));
  }

  async function submitEditComment(comment, newText) {
    try {
      await axios({
        method: "post",
        url: `http://localhost:3001/api/comments/${comment.id}`,
        withCredentials: true,
        data: { message: newText }
      });

      // Find index of edited comment.
      const index = comments.findIndex(cmt => cmt.id === comment.id);
      if (index !== -1) {
        // Create new comments-array and add the edited comment body to it.
        const newComments = comments.slice(0);
        newComments[index].body = newText;
        // Change the updated_at date as well.
        newComments[index].updated_at = new Date();
        // Exit edit-mode.
        stopEditComment(comment);
        // Push newComments to state.
        setComments(newComments);
      }
    } catch (error) {
      // Handle error and inform user.
      if (error.response) {
        setError(`Error: ${error.response.data}`);
      }
    } finally {
      stopEditComment(comment);
    }
  }

  function stopEditComment(comment) {
    // Remove comment from editing array.
    setEditing(editing => editing.filter(cmtId => cmtId !== comment.id));
  }

  return (
    <React.Fragment>
      {comments && comments.length > 0 ?
        <ExpandButton
          accentcolor={accentColor}
          onClick={toggleExpanded}
        >
          <ExpandText>{`${comments.length} kommentarer`}</ExpandText>
        </ExpandButton>
        : ""
      }
      <div>
        <CommentContextMenu
          isOpen={!!contextComment}
          closeMenu={closeContextMenu}
          anchorElement={contextCommentRef.current}
          comment={contextComment}
          deleteComment={deleteComment}
          editComment={editComment}
        />
        {comments ?
          expanded ?
            comments.map(comment => (
              (editing.indexOf(comment.id) !== -1 ?
                <MultilineTextInput
                  key={comment.body + comment.user_name + comment.updated_at}
                  showUserAvatar
                  onTextSubmit={(text) => submitEditComment(comment, text)}
                  onStopWriting={() => stopEditComment(comment)}
                  accentColor={accentColor}
                  submitText="Redigera"
                  submitLoadingText="Redigerar..."
                  beginWritingImmediately={true}
                  startText={comment.body}
                  paddingTop={0}
                  paddingBottom={1}
                  minHeight={4}
                  textPaddingTop={1.5}
                />
                :
                <CommentItem
                  key={comment.body + comment.user_name + comment.updated_at}
                  comment={comment}
                  toggleContextMenu={toggleContextMenu}
                />)
            ))
            :
            (editing.indexOf(comments[comments.length - 1].id) !== -1 ?
              <MultilineTextInput
                key={comments[comments.length - 1].body}
                showUserAvatar
                onTextSubmit={(text) => submitEditComment(comments[comments.length - 1], text)}
                onStopWriting={() => stopEditComment(comments[comments.length - 1])}
                accentColor={accentColor}
                submitText="Redigera"
                submitLoadingText="Redigerar..."
                beginWritingImmediately={true}
                startText={comments[comments.length - 1].body}
                paddingTop={0}
                paddingBottom={1}
                minHeight={4}
                textPaddingTop={1.5}
              />
              :
              <CommentItem
                key={comments[comments.length - 1].body}
                comment={comments[comments.length - 1]}
                toggleContextMenu={toggleContextMenu}
                ellipsis="true"
              />)
          :
          ""}
      </div>
    </React.Fragment>
  );
}

/**
 * Props.
 */
CommentList.propTypes = {
  comments: PropTypes.any,
  setComments: PropTypes.func,
  setError: PropTypes.func,
  accentColor: PropTypes.string,
};

/**
 * Styling.
 */
const ExpandText = styled(Body2)`
  margin-bottom: 0.5rem;
`;
const ExpandButton = styled.button`
  padding: 1rem 1.5rem 0 1.5rem;

  &:hover ${ExpandText} {
    color: ${props => "#" + props.accentcolor};
  }
`;

export default CommentList;

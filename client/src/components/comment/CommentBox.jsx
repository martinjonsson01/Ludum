import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "fetch-suspense";
import axios from "axios";
import { Snackbar } from "@material/react-snackbar";

import "@material/react-button/index.scss";
import "@material/react-icon-button/index.scss";
import "@material/react-snackbar/index.scss";

import MultilineTextInput from "../common/MultilineTextInput";
import CommentList from "../comment/CommentList";

/*
 * Component.
 */
function CommentBox({ accentColor, commentUrl }) {

  const initialComments = useFetch(commentUrl, {
    method: "GET", credentials: "include"
  });

  const [comments, setComments] = useState(initialComments);
  const [error, setError] = useState();

  async function postComment(commentText) {
    try {
      const result = await axios({
        method: "put",
        url: commentUrl,
        withCredentials: true,
        data: { message: commentText }
      });

      // Add new comment to comments array.
      if (comments) {
        // Clone comments into newComments.
        const newComments = comments.slice(0);
        // Add new comment.
        newComments.push(result.data);
        // Update state.
        setComments(newComments);
      }
    } catch (error) {
      // Handle error and inform user.
      if (error.response) {
        setError(`Error: ${error.response.data}`);
      }
    }
  }

  function onSnackbarDismiss() {
    setError(null);
  }

  return (
    <Box>
      {/** Comment list. */}
      <CommentList
        comments={comments}
        setComments={setComments}
        accentColor={accentColor}
        setError={setError}
      />
      {/** Divider. */}
      {comments ? <Divider /> : ""}
      {/** Text input. */}
      <MultilineTextInput
        accentColor={accentColor}
        submitText="Inlägg"
        submitLoadingText="Lägger upp ..."
        onTextSubmit={postComment}
        showUserAvatar
      />
      {/** Error box. */}
      {error ?
        <Snackbar
          leading
          message={error}
          actionText="Avfärda"
          onClose={onSnackbarDismiss}
          timeoutMs={10 * 1000}
        />
        : ""
      }
    </Box>
  );
}

/*
 * Props.
 */
CommentBox.propTypes = {
  commentUrl: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
};

/*
 * Styling.
 */
const Box = styled.section`
  margin: 0 -1.5rem -1.5rem -1.5rem;
`;
const Divider = styled.div`
  height: 1px;
  background: var(--mdc-theme-border);
`;

export default CommentBox;

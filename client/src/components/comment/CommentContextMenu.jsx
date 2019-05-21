import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

/**
 * Component.
 */
function CommentContextMenu({ isOpen, anchorElement, closeMenu, comment, deleteComment, editComment }) {

  function startEditingComment() {
    // Open comment editor.
    editComment(comment);
    // Close context menu.
    closeMenu();
  }

  async function removeComment() {
    // Delete comment.
    try {
      await deleteComment(comment);
    } catch (error) {
      // Handle error and inform user.
    } finally {
      closeMenu();
    }
  }

  return (
    <StyledPopper
      open={isOpen}
      anchorEl={anchorElement}
      keepMounted={true}
      transition={true}
      placement="bottom-end"
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{ transformOrigin: placement === "bottom" ? "center top" : "right top" }}
        >
          <StyledPaper>
            <ClickAwayListener onClickAway={closeMenu}>
              <MenuList>
                <StyledMenuItem onClick={startEditingComment}>Redigera</StyledMenuItem>
                <StyledMenuItem onClick={removeComment}>Ta bort</StyledMenuItem>
              </MenuList>
            </ClickAwayListener>
          </StyledPaper>
        </Grow>
      )}
    </StyledPopper>
  );
}

/**
 * Props.
 */
CommentContextMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  comment: PropTypes.object,
  anchorElement: PropTypes.object,
  closeMenu: PropTypes.func,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
};

/**
 * Styling.
 */
const StyledPaper = styled(Paper)`
  background: var(--mdc-theme-surface) !important;
  border-radius: 0.5rem !important;

  border-width: 1px !important;
  border-style: solid !important;
  border-color: var(--mdc-theme-border) !important;
`;
const StyledPopper = styled(Popper)`
  z-index: 2;
`;
const StyledMenuItem = styled(MenuItem)`
  color: var(--mdc-theme-on-surface) !important;
`;

export default CommentContextMenu;

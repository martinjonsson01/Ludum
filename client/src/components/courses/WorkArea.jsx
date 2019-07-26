import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import AddIcon from "@material-ui/icons/Add";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import GoogleDrivePicker from "./GoogleDrivePicker";
import SuspenseMaterialsList from "../common/SuspenseMaterialsList";

/*
 * Component.
 */
function WorkArea({ accentColor, courseId, assignmentId }) {

  const [pickerVisible, setPickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [additionalMaterials, setAdditionalMaterials] = useState([]);
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [showUploadScreenFirst, setShowUploadScreenFirst] = useState(true);

  const attachMenuAnchorRef = useRef(null);

  function onPickerClose() {
    // Hide picker.
    setPickerVisible(false);
  }

  async function onFilesPicked(fileUrls) {
    // Start loading.
    setLoading(true);
    try {
      await axios({
        method: "put",
        url: `http://localhost:3001/api/courses/${courseId}/assignment/${assignmentId}/materials`,
        withCredentials: true,
        data: { materials: fileUrls }
      });
      const newMaterials = fileUrls.map(url => {
        return { id: url, url: url };
      });
      // Add picked files to any already existing additional materials.
      setAdditionalMaterials(additionalMaterials.concat(newMaterials));
    } catch (error) {
      // Handle error and inform user.
      if (error.response) {
        //setError(`Error: ${error.response.data}`);
      }
    }
    // Stop loading.
    setLoading(false);
  }

  async function submitAssignment() {
    // Start loading.
    setLoading(true);

    // Stop loading.
    setLoading(false);
  }

  function toggleAttachMenu() {
    // Toggle attach menu visibility.
    setAttachMenuOpen(!attachMenuOpen);
  }

  function onAttachMenuClose(event) {
    if (attachMenuAnchorRef.current && attachMenuAnchorRef.current.contains(event.target)) {
      return;
    }

    setAttachMenuOpen(false);
  }

  function showPicker(event) {
    onAttachMenuClose(event);
    setPickerVisible(true);
  }

  function openUploadPicker(event) {
    setShowUploadScreenFirst(true);
    showPicker(event);
  }

  function openFilePicker(event) {
    setShowUploadScreenFirst(false);
    showPicker(event);
  }

  return (
    <Container>
      {/** Google Drive Picker */}
      {pickerVisible &&
        <GoogleDrivePicker
          onFilesPicked={onFilesPicked}
          uploadViewDefault={showUploadScreenFirst}
          onClose={onPickerClose}
        />
      }
      {/** Assignment Work Materials */}
      <SuspenseMaterialsList
        fetchUrl={`http://localhost:3001/api/courses/${courseId}/assignment/${assignmentId}/materials`}
        accentColor={accentColor}
        additionalMaterials={additionalMaterials}

      />
      {/** Buttons */}
      <ButtonArea>
        {/** Attach Button */}
        <StyledButton
          ref={attachMenuAnchorRef}
          onClick={toggleAttachMenu}
          disabled={loading}
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          size="medium"
        >
          <StyledAttachFileIcon />
          Bifoga
        </StyledButton>
        {/** Attach Menu */}
        <StyledPopper
          open={attachMenuOpen}
          anchorEl={attachMenuAnchorRef.current}
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
            >
              <StyledPaper id="menu-list-grow">
                <ClickAwayListener onClickAway={onAttachMenuClose}>
                  <MenuList>
                    <StyledMenuItem onClick={openFilePicker}>Google Drive</StyledMenuItem>
                    <StyledMenuItem onClick={onAttachMenuClose}>Länk</StyledMenuItem>
                    <StyledMenuItem onClick={openUploadPicker}>Fil</StyledMenuItem>
                  </MenuList>
                </ClickAwayListener>
              </StyledPaper>
            </Grow>
          )}
        </StyledPopper>
        {/** Create Button */}
        <StyledButton
          size="medium"
          disabled={loading}
        >
          <StyledAddIcon />
          Skapa
        </StyledButton>
        {/** Margin */}
        <EmptyMargin />
        {/** Submit Button */}
        <StyledButton
          onClick={submitAssignment}
          disabled={loading}
          variant="contained"
          size="medium"
          color="primary"
        >
          {loading ? "Lämnar in..." : "Lämna in"}
        </StyledButton>
      </ButtonArea>
    </Container>
  );
}

/*
 * Props.
 */
WorkArea.propTypes = {
  accentColor: PropTypes.string,
  courseId: PropTypes.string.isRequired,
  assignmentId: PropTypes.number.isRequired,
};

/*
 * Styling.
 */
const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 1.875rem;
`;
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: -1rem;
`;
const EmptyMargin = styled.div`
  flex-grow: 1;
  flex-basis: 0.000000001px;
`;
const StyledButton = styled(Button)`
  text-transform: none !important;
  font-family: Montserrat, sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  border-radius: 0.1875rem !important;
  margin-left: 1rem !important;
  min-width: 6rem !important;
  background-color: ${props =>
    props.disabled ?
      props.variant === "contained" ? "var(--mdc-theme-background-disabled)" : "none"
      :
      props.variant === "contained" ? "var(--mdc-theme-primary)" : "none"} !important;
  color: ${props =>
    props.disabled ?
      "var(--mdc-theme-on-background-disabled)"
      :
      props.variant === "contained" ? "var(--mdc-theme-on-primary)" : "var(--mdc-theme-link)"} !important;

  &:hover {
    background: var(--mdc-theme-primary-opacity-10) !important;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  color: var(--mdc-theme-on-surface) !important;
`;
const StyledPaper = styled(Paper)`
  background: var(--mdc-theme-surface) !important;

  transition: 
    opacity 0.03s cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
    transform 0.1s cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  transition-timing-function: 
    linear, 
    cubic-bezier(0, 0, 0.2, 1) !important;
`;
const StyledPopper = styled(Popper)`
  z-index: 9;
`;
const StyledAddIcon = styled(AddIcon)`
  margin-right: 0.5rem; /* 8px at 100% scale. */
`;
const StyledAttachFileIcon = styled(AttachFileIcon)`
  margin-right: 0.5rem; /* 8px at 100% scale. */
`;

export default WorkArea;

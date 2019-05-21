import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import Button from "@material/react-button";

import { AppContext } from "../common/AppContext";

/*
 * Component.
 */
function MultilineTextInput({
  showUserAvatar,
  onTextSubmit,
  onStopWriting,
  accentColor,
  submitText,
  submitLoadingText,
  beginWritingImmediately = false,
  startText = "",
  paddingTop = 1.5,
  paddingBottom = 1.5,
  paddingLeft = 1.5,
  paddingRight = 1.5,
  minHeight = 5.25,
  textPaddingTop = 0,
}) {

  const { user } = useContext(AppContext);
  const [writing, setWriting] = useState(beginWritingImmediately);
  const [text, setText] = useState(startText);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef();

  function startWriting() {
    if (!writing) {
      setWriting(true);
    }
  }

  function updateText(event) {
    setText(event.currentTarget.value);
  }

  async function stopWriting() {
    if (writing) {
      setWriting(false);
      // Clear textarea.
      setText("");
      if (onStopWriting) {
        // Invoke callback.
        await onStopWriting();
      }
    }
  }

  async function submit() {
    try {
      // Start loading.
      setLoading(true);
      // Await provided submit function.
      await onTextSubmit(text);
    } finally {
      // Stop loading.
      setLoading(false);
      // Go out of writing mode.
      await stopWriting();
    }
  }

  useEffect(() => {
    if (startText) {
      // If text has not been changed from startText.
      if (startText === text) {
        // Select all text.
        textareaRef.current.select();
      }
    }
  });

  return (
    <CommentArea
      paddingtop={paddingTop}
      paddingbottom={paddingBottom}
      paddingleft={paddingLeft}
      paddingright={paddingRight}
      minheight={minHeight}
    >
      {showUserAvatar ?
        <UserImage
          src={user.picture}
          alt={user.name}
        />
        : ""
      }
      <InputArea>
        <StyledTextarea
          value={text}
          onChange={updateText}
          placeholder="Kommentera ..."
          onClick={startWriting}
          writing={writing ? 1 : 0}
          ref={textareaRef}
          accentcolor={accentColor}
          paddingtop={paddingTop}
          paddingbottom={paddingBottom}
          paddingleft={paddingLeft}
          paddingright={paddingRight}
          textpaddingtop={textPaddingTop}
        />
        {writing ?
          <ButtonArea>
            <StyledButton onClick={stopWriting}>Avbryt</StyledButton>
            <StyledButton
              onClick={submit}
              raised
              disabled={loading || !text}>
              {loading ? submitLoadingText : submitText}
            </StyledButton>
          </ButtonArea>
          : ""
        }
      </InputArea>
    </CommentArea>
  );
}

/*
 * Props.
 */
MultilineTextInput.propTypes = {
  onTextSubmit: PropTypes.func.isRequired,
  onStopWriting: PropTypes.func,
  submitText: PropTypes.string.isRequired,
  submitLoadingText: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
  showUserAvatar: PropTypes.bool,
  paddingTop: PropTypes.any,
  paddingBottom: PropTypes.any,
  paddingLeft: PropTypes.any,
  paddingRight: PropTypes.any,
  textPaddingTop: PropTypes.any,
  minHeight: PropTypes.any,
  beginWritingImmediately: PropTypes.bool,
  startText: PropTypes.string,
};

/*
 * Styling.
 */
const CommentArea = styled.div`
  display: flex;
  min-height: ${props => `${props.minheight}rem`};
  flex-direction: row;
  align-items: center;
  padding-top: ${props => `${props.paddingtop}rem`};
  padding-bottom: ${props => `${props.paddingbottom}rem`};
  padding-left: ${props => `${props.paddingleft}rem`};
  padding-right: ${props => `${props.paddingright}rem`};
`;
const StyledTextarea = styled(TextareaAutosize)`
  background: transparent;
  color: var(--mdc-theme-on-surface);
  flex-grow: 1;
  cursor: text;

  /* Negative margin allows padding to extend size of element, thus enlarging tap area. */
  margin-top: ${props => `-${props.paddingtop}rem`};
  margin-bottom: ${props => `-${props.paddingbottom}rem`};
  margin-left: 0;
  margin-right: 0;
  padding-top: ${props => `calc(${props.paddingtop}rem + ${props.textpaddingtop}rem)`};
  padding-bottom: ${props => `calc(${props.paddingbottom}rem - ${props.writing ? "0.125rem" : "0px"})`};
  padding-left: 0;
  padding-right: 0;

  border: none;
  border-bottom: ${props => props.writing ? "0.125rem solid var(--mdc-theme-border)" : "none"};
  
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none; /* Remove the resize handle on the bottom right. */

  font-family: Roboto, sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.03125em;

  &::placeholder {
    color: ${props => props.writing ? "" : "#" + props.accentcolor};
  }
`;
const UserImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  align-self: flex-start;
  margin: 0.25rem 1rem 0 0;
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

export default MultilineTextInput;

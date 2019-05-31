import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Modal css flow:
 * 1. display: none;
 * 2. class "visible" is added: display: flex; width, height, top, left all given values (by initialBounds object).
 * 3. class "fullsize" added: width, height given values. position: static;
 * 
 * Modal flow:
 * 1. Modal is hidden.
 * 2. Modal is visible. Modal is resized to fit content to transition FROM.
 * 3. Modal begins transition into final state, using css transitions.
 */

/*
 * Component.
 */
function Modal({ fullSize, setFullSize, initialBounds, onScrimClick, children, startVisible = true }) {

  const [visible] = useState(startVisible);
  const [maximized, setMaximized] = useState(false);

  const contentRef = useRef();

  function onScrim() {
    // Call on parent component to change fullSize prop.
    setFullSize(false);
  }

  // Use this effect to delay the state change, allowing the CSS transitions to trigger.
  useEffect(() => {
    setMaximized(fullSize);
  }, [fullSize]);

  // Adss event listener for handling transition end and triggering onScrimClick callback. 
  useEffect(() => {
    const ref = contentRef.current;

    function onTransitionEnd() {
      if (!fullSize) {
        onScrimClick();
      }
    }

    if (ref) {
      ref.addEventListener("transitionend", onTransitionEnd);
    }
    return () => {
      if (ref) {
        ref.removeEventListener("transitionend", onTransitionEnd);
      }
    };
  }, [onScrimClick, fullSize]);

  return (
    <Container>
      <Scrim
        onClick={onScrim}
        className={maximized ? "fullsize" : ""}
      />
      <Content
        ref={contentRef}
        bounds={initialBounds}
        className={(visible ? "visible" : "") + " " + (maximized ? "fullsize" : "")}
      >
        {children}
      </Content>
    </Container>
  );
}

/*
 * Props.
 */
Modal.propTypes = {
  fullSize: PropTypes.bool.isRequired,
  setFullSize: PropTypes.func.isRequired,
  initialBounds: PropTypes.object.isRequired,
  onScrimClick: PropTypes.func,
  children: PropTypes.element.isRequired,
  startVisible: PropTypes.bool,
};

/*
 * Styling.
 */
const Container = styled.div`
  position: fixed;

  overflow-y: scroll;

  z-index: 7;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Scrim = styled.div`
  position: fixed;

  opacity: 0;
  background-color: rgba(0,0,0,.32);

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transition-delay: 0ms;
  transition-duration: 150ms;
  transition-property: opacity;

  &.fullsize {
    opacity: 1;
  }
`;
const Content = styled.div`
  display: none;

  transition-delay: 0ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  z-index: 8;
  
  &.visible {
    /*position: fixed;*/
    display: flex;
    /* Margin on top and bottom of modal that takes up entire screen. */
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    /* Half the width of the window - half the width of the modal = centered on x axis. */
    margin-left: ${props => (window.innerWidth / 2) - (props.bounds.width / 2)}px;
    /* Set modal width equal to content width. */
    width: ${props => props.bounds.width}px;
    /* Set minimum height equal to content height. */
    min-height: ${props => props.bounds.height}px;
    /* Translate x- and y-coordinates of modal so it is at the same position the 
     * content we are transitioning from was located at. The actual position of the modal
     * is centered horizontally and taking up the entire height (minus margins).*/
    /* translateX: left-offset of content - half window width - half content width = 
     * x-offset that places modal at same coordinates as content was */
    /* translateY: left-offset of content - half window width - half content width = 
     * x-offset that places modal at same coordinates as content was */
    transform: ${props =>
    `translate(
      ${props.bounds.left - ((window.innerWidth / 2) - (props.bounds.width / 2))}px, 
      ${props.bounds.top - 24}px
    )`};
  }

  &.visible.fullsize {
    /* Reset translation so that modal is restored to actual position. */
    transform: translate(0, 0);
    /* Set the minimum height to the entire viewport height - margins of 1.5rem top and bottom. */
    min-height: calc(100vh - 2*1.5rem);
  }
`;

export default Modal;

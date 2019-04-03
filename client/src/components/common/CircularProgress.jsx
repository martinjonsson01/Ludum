import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

function CircularProgress({ children, hidden }) {
  return (
    <ProgressContainer>
      <Progress hidden={hidden} />
      {children}
    </ProgressContainer>
  );
}

CircularProgress.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool
};

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Progress = styled.progress`
  display: ${props => props.hidden ? "none" : "block"};
  position: absolute;
  width: 158px;
  height: 158px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;
  border: none;
  border-radius: 50%;
  padding: 0.25em;
  color: var(--mdc-theme-secondary);
  background-color: transparent;
  font-size: 16px;
  overflow: hidden;
  /* Set opacity to 0 so that it can fade in. */
  opacity: 0;
`;
const ProgressContainer = styled.div`
  position: relative;
  display:flex;
  align-items:center;
  justify-content:center;

  /**
   * The following styles are all to give the progress bar its look.
   * Taken from: https://codepen.io/finnhvman/pen/bmNdNr
   */
  ${Progress}::-webkit-progress-bar {
    background-color: transparent;
  }
  ${Progress}:indeterminate {
    -webkit-mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    /* This line below contains two animations seperated by a comma. 
    The format for the second one is: "@keyframes duration | timing-function | delay | 
    iteration-count | direction | fill-mode | play-state | name"*/
    animation: pure-material-progress-circular 6s infinite cubic-bezier(0.3, 0.6, 1, 1), 0.2s ease 0.5s 1 normal forwards running ${fade};
  }
  ${Progress}:-ms-lang(x), ${Progress}:indeterminate {
    animation: none;
  }
  ${Progress}:indeterminate::before,
  ${Progress}:indeterminate::-webkit-progress-value {
    content: "";
    display: block;
    box-sizing: border-box;
    margin-bottom: 0.25em;
    border: solid 0.25em transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    width: 100% !important;
    height: 100%;
    background-color: transparent;
    animation: pure-material-progress-circular-pseudo 0.75s infinite linear alternate;
  }
  ${Progress}:indeterminate::-moz-progress-bar {
    box-sizing: border-box;
    border: solid 0.25em transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: transparent;
    animation: pure-material-progress-circular-pseudo 0.75s infinite linear alternate;
  }
  ${Progress}:indeterminate::-ms-fill {
    animation-name: -ms-ring;
  }
  @keyframes pure-material-progress-circular {
    0% {
        transform: rotate(0deg);
    }
    12.5% {
        transform: rotate(180deg);
        animation-timing-function: linear;
    }
    25% {
        transform: rotate(630deg);
    }
    37.5% {
        transform: rotate(810deg);
        animation-timing-function: linear;
    }
    50% {
        transform: rotate(1260deg);
    }
    62.5% {
        transform: rotate(1440deg);
        animation-timing-function: linear;
    }
    75% {
        transform: rotate(1890deg);
    }
    87.5% {
        transform: rotate(2070deg);
        animation-timing-function: linear;
    }
    100% {
        transform: rotate(2520deg);
    }
  }
  @keyframes pure-material-progress-circular-pseudo {
    0% {
        transform: rotate(-30deg);
    }
    29.4% {
        border-left-color: transparent;
    }
    29.41% {
        border-left-color: currentColor;
    }
    64.7% {
        border-bottom-color: transparent;
    }
    64.71% {
        border-bottom-color: currentColor;
    }
    100% {
        border-left-color: currentColor;
        border-bottom-color: currentColor;
        transform: rotate(225deg);
    }
  }
`;

export default CircularProgress;

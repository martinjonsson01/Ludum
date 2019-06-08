import React from "react";
import PropTypes from "prop-types";
import Tab from "@material/react-tab";
import { withRouter } from "react-router-dom";

function CourseTab(props) {

  const { location, history } = props;

  function tabOnClick() {
    if (location.pathname !== props.link) history.push(props.link);
  }

  return (
    <Tab onClick={tabOnClick}>
      <span className='mdc-tab__text-label'>{props.text}</span>
    </Tab>
  );
}

CourseTab.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  text: PropTypes.string,
  link: PropTypes.string,
};

export default withRouter(CourseTab);

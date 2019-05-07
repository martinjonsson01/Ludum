import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LinkPreview from "../common/LinkPreview";

/**
 * Component.
 */
function MaterialsList({ event, accentColor }) {

  let linkCards;
  if (event.material_urls) {
    linkCards = event.material_urls.map(url => (
      <LinkPreview
        key={url}
        url={url}
        target="_blank"
        hoverColor={accentColor}
      />
    ));
  }

  return (
    linkCards ? (
      <Materials>
        {linkCards}
      </Materials>
    ) : ""
  );
}

/**
 * Props.
 */
MaterialsList.propTypes = {
  event: PropTypes.object.isRequired,
  accentColor: PropTypes.string,
};

/**
 * Styling.
 */
const Materials = styled.section`
  margin-left: 3rem;

  @media (max-width: 800px) {
    margin-left: 0;
  }
`;

export default MaterialsList;

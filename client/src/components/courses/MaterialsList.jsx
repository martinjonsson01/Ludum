import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LinkPreview from "../common/LinkPreview";

/*
 * Component.
 */
function MaterialsList({ materials, accentColor, className }) {

  var linkCards;
  if (materials) {
    linkCards = materials.map(material => (
      <LinkPreview
        key={material.id}
        url={material.url}
        target="_blank"
        hoverColor={accentColor}
      />
    ));
  }

  return (
    linkCards ? (
      <Container className={className}>
        {linkCards}
      </Container>
    ) : ""
  );
}

/*
 * Props.
 */
MaterialsList.propTypes = {
  materials: PropTypes.array,
  accentColor: PropTypes.string,
  className: PropTypes.string,
};

/*
 * Styling.
 */
const Container = styled.section`
  max-width: 100%;
`;

export default MaterialsList;

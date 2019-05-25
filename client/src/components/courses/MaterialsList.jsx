import React from "react";
import PropTypes from "prop-types";

import LinkPreview from "../common/LinkPreview";

/**
 * Component.
 */
function MaterialsList({ event, accentColor, className }) {

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
      <section className={className}>
        {linkCards}
      </section>
    ) : ""
  );
}

/**
 * Props.
 */
MaterialsList.propTypes = {
  event: PropTypes.object.isRequired,
  accentColor: PropTypes.string,
  className: PropTypes.string,
};

export default MaterialsList;

import React from "react";
import PropTypes from "prop-types";

import LinkPreview from "../common/LinkPreview";

/*
 * Component.
 */
function MaterialsList({ materialUrls, accentColor, className }) {

  var linkCards;
  if (materialUrls) {
    linkCards = materialUrls.map(url => (
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

/*
 * Props.
 */
MaterialsList.propTypes = {
  materialUrls: PropTypes.array,
  accentColor: PropTypes.string,
  className: PropTypes.string,
};

export default MaterialsList;

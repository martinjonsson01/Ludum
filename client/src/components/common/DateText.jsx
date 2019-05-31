import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/*
 * Component.
 */
function DateText(props) {

  var { prefix, publishDate, editDate = null, formatter, refreshIntervalSeconds = 60 } = props;

  // Make editDate equal to publishDate if no editDate is provided.
  // This way, the edit date won't show up.
  if (!editDate) editDate = publishDate;

  const [formattedPublishDate, setFormattedPublishDate] = useState(formatter(new Date(publishDate)));
  const [formattedEditDate, setFormattedEditDate] = useState(formatter(new Date(editDate)));

  // Refresh interval effect.
  useEffect(() => {
    function updateDates() {
      setFormattedPublishDate(formatter(new Date(publishDate)));
      setFormattedEditDate(formatter(new Date(editDate)));
    }
    // Start interval.
    const interval = setInterval(updateDates, refreshIntervalSeconds * 1000);
    
    // Clean up interval.
    return () => {
      clearInterval(interval);
    };
  }, [publishDate, editDate, formatter, refreshIntervalSeconds]);

  return (
    <Text {...props}>
      {prefix}{formattedPublishDate}{publishDate !== editDate && ` (Redigerad ${formattedEditDate})`}
    </Text>
  );
}

/*
 * Props.
 */
DateText.propTypes = {
  prefix: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  editDate: PropTypes.string,
  formatter: PropTypes.func.isRequired,
  refreshIntervalSeconds: PropTypes.number,
};

/*
 * Styling.
 */
const Text = styled.div`
  font-family: Roboto, Arial, sans-serif;
  font-size: 0.8125rem; /* 13px at 100% scale */
  font-weight: 500;

  letter-spacing: 0.01875rem; /* 0.3px at 100% scale */
  line-height: 1rem; /* 16px at 100% scale */

  color: var(--mdc-theme-text-subtitle);
`;

export default DateText;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "fetch-suspense";

import FeedItem from "./FeedItem";

/*
 * FeedPage component.
 */
function FeedPage({ courseId, accentColor }) {

  const feed = useFetch(
    `http://localhost:3001/api/courses/${courseId}/feed`,
    { method: "GET", credentials: "include" }
  );

  return (
    <Container>
      <ul>
        {feed.map((event, index, array) => [
          <FeedItem
            key={event.content}
            event={event}
            accentColor={accentColor}
          />,
          // Only render MarginDivider if not last item.
          array.length - 1 === index ? "" :
            <MarginDivider key={index + "_divider"} />
        ])}
      </ul>
    </Container>
  );
}

/*
 * Props.
 */
FeedPage.propTypes = {
  courseId: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
};

/*
 * FeedPage styling.
 */
const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 764px;
  margin: 1.5rem auto;

  @media (max-width: 600px) {
    max-width: calc(100% - (2*0.25rem));
  }
`;
const MarginDivider = styled.div`
  margin-top: 1.5rem;
`;

export default FeedPage;

import React from "react";
import styled from "styled-components";
import withTitle from "../common/withTitle.jsx";

import FetchList from "../common/FetchList";
import NewsItem from "./NewsItem";

function NewsPage() {
  return (
    <Container>
      <FetchList
        url="http://localhost:3001/api/news"
        listItemComponent={NewsItem}
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 1.5rem auto;
`;

export default withTitle(NewsPage, "Nyheter");

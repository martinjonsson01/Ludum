import React from "react";
import styled from "styled-components";

import FetchList from "../common/FetchList";
import NewsItem from "./NewsItem";

const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 1.5rem auto;
`;
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

export default NewsPage;

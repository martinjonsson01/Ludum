import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import FetchList from "../common/FetchList";
import NewsItem from "./NewsItem";

const Container = styled.div`
  max-width: calc(100% - (2*1.5rem));
  width: 1000px;
  margin: 1.5rem auto;
`;
const StyledList = styled.ul`
  list-style: none;
`;

function List({ children }) {
  return <StyledList>{children}</StyledList>;
}
List.propTypes = {
  children: PropTypes.array
};

function NewsPage() {
  return (
    <Container>
      <FetchList
        url="http://localhost:3001/api/getNews"
        listComponent={List}
        listItemComponent={NewsItem}
      />
    </Container>
  );
}

export default NewsPage;

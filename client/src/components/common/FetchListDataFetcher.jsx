import React, { useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "fetch-suspense";

/**
 * Inner component of FetchList. Fetches data using a GET-request to
 * the provided url prop. Renders data using provided listComponent prop.
 */
function FetchListDataFetcher(props) {

  const listData = useFetch(props.url, { method: "GET" });

  const StyledList = styled.ul`
    list-style: none;
  `;
  function List({ children }) {
    return <StyledList>{children}</StyledList>;
  }
  List.propTypes = {
    children: PropTypes.array
  };
  function Divider() {
    return "";
  }

  var ListComponent = props.listComponent;
  var ListDivider = props.listDivider;

  if (!ListComponent) ListComponent = List;
  if (!ListDivider) ListDivider = Divider;

  useEffect(() => {
    const itemId = props.location.hash;
    const itemElement = document.getElementById(itemId.substring(1));
    if (!itemElement) return;
    // Scroll to itemElement.
    itemElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
    // Apply temporary styling to itemElement to highlight it.
    itemElement.classList.add("navigate-highlight");
    // Remove temporary styling after 1000ms.
    setTimeout(() => {
      itemElement.classList.remove("navigate-highlight");
    }, 1000);
  });

  return (
    <ListComponent
      twoLine={true}
      avatarList={true}>
      {listData.map((listItem, index, array) => [
        <props.listItemComponent
          key={index}
          listItem={listItem}
          index={index}
          array={array}
          onNavigateChange={props.onNavigateChange}
        />,
        // Only render ListDivider if not last item.
        array.length - 1 === index ? "" :
          <ListDivider
            key={index + "_divider"} />
      ])}
    </ListComponent>
  );
}

FetchListDataFetcher.propTypes = {
  url: PropTypes.string.isRequired,
  listComponent: PropTypes.any,
  listItemComponent: PropTypes.any.isRequired,
  listDivider: PropTypes.any,
  location: PropTypes.object,
  onNavigateChange: PropTypes.func,
};

export default withRouter(FetchListDataFetcher);

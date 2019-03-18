import React from "react";
import PropTypes from "prop-types";
import useFetch from "fetch-suspense";

/**
 * Inner component of FetchList. Fetches data using a GET-request to
 * the provided url prop. Renders data using provided listComponent prop.
 */
function FetchListDataFetcher(props) {

  const list = useFetch(props.url, { method: "GET" });

  return (
    <props.listComponent
      twoLine={true}
      avatarList={true}>
      {list.map((listItem, index, array) =>
        <props.listItemComponent
          key={index}
          listItem={listItem}
          index={index}
          array={array} />
      )}
    </props.listComponent>
  );
}

FetchListDataFetcher.propTypes = {
  url: PropTypes.string,
  listComponent: PropTypes.any,
  listItemComponent: PropTypes.any,
};

export default FetchListDataFetcher;

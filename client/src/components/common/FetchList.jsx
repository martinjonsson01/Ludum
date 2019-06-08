import React, { Suspense } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";
import LinearProgress from "@material/react-linear-progress";
import FetchListDataFetcher from "./FetchListDataFetcher";

/**
 * Fetches data from a URL and displays it in a list. Shows loading indicator and catches
 * any errors that occur during the fetch.
 */
function FetchList(props) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LinearProgress indeterminate={true} />}>
        <FetchListDataFetcher
          url={props.url}
          listComponent={props.listComponent}
          listItemComponent={props.listItemComponent}
          listDivider={props.listDivider}
          onNavigateChange={props.onNavigateChange} />
      </Suspense>
    </ErrorBoundary>
  );
}

FetchList.propTypes = {
  url: PropTypes.string.isRequired,
  listComponent: PropTypes.any,
  listItemComponent: PropTypes.any.isRequired,
  listDivider: PropTypes.any,
  onNavigateChange: PropTypes.func,
};

export default FetchList;

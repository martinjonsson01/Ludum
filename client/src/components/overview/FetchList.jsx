import React, { Suspense } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "../common/ErrorBoundary";
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
          listComponent={props.listComponent} />
      </Suspense>
    </ErrorBoundary>
  );
}

FetchList.propTypes = {
  url: PropTypes.string,
  listComponent: PropTypes.any,
};

export default FetchList;

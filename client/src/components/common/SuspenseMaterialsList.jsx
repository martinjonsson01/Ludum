import React, { Suspense } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LinearProgress from "@material/react-linear-progress";
import useFetch from "fetch-suspense";

import MaterialsList from "../courses/MaterialsList";

/*
 * Component.
 */
function SuspenseMaterialsList({ fetchUrl, accentColor, additionalMaterials }) {

  const fetchedMaterials = useFetch(fetchUrl,
    { method: "GET", credentials: "include" }
  );

  // Append any additional material URLs before rendering.
  const materials =
    Array.prototype.concat(fetchedMaterials, additionalMaterials);

  return (
    <MaterialsList
      accentColor={accentColor}
      materials={materials}
    />
  );
}

/*
 * Wraps component with suspense fallback. 
 */
function SuspenseWrapper(props) {
  return (
    <Suspense fallback={<StyledLinearProgress indeterminate={true} />}>
      <SuspenseMaterialsList
        {...props}
      />
    </Suspense>
  );
}

/*
 * Props.
 */
SuspenseMaterialsList.propTypes = {
  fetchUrl: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
  additionalMaterials: PropTypes.array,
};

/*
 * Styling. 
 */
const StyledLinearProgress = styled(LinearProgress)`
  margin: 0.5rem -1.5rem 0;
  width: auto !important;
`;

export default SuspenseWrapper;

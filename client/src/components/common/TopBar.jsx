import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TopAppBar, { TopAppBarSection, TopAppBarTitle, TopAppBarRow, TopAppBarIcon } from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";

import ErrorBoundary from "./ErrorBoundary";
import AccountButton from "./AccountButton";

function TopBar({ drawerOpen, onDrawerToggle, title, onNavigateChange }) {

  const [topAppBarSmall, setTopAppBarSmall] = useState(window.innerWidth > 600);

  // Resize top app bar based on window size.
  useEffect(() => {
    // Create listener.
    function onWindowResize() {
      setTopAppBarSmall(window.innerWidth > 600);
    }
    // Register listener.
    window.addEventListener("resize", onWindowResize);
    // Cleanup.
    return () => {
      // Unregister listener.
      window.removeEventListener("resize", onWindowResize);
    };
  });

  return (
    <TopAppBar
      fixed
      id="topbar"
      className={drawerOpen ? "mdc-top-app-bar-drawer-fix" : ""}
      dense={topAppBarSmall}>
      <TopAppBarRow>
        <TopAppBarSection align="start">
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              hasRipple
              icon="menu"
              onClick={onDrawerToggle} />
          </TopAppBarIcon>
        </TopAppBarSection>
        <TopAppBarSection>
          <TopAppBarTitle
            className="align-text-center">
            {title}
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align="end">
          <ErrorBoundary key="accountButtonErrorBoundary">
            <AccountButton
              className="top-app-bar-needs-drawer-fix"
              onNavigateChange={onNavigateChange} />
          </ErrorBoundary>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}

TopBar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  onNavigateChange: PropTypes.func.isRequired,
};

export default TopBar;

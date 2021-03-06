import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TopAppBar, { TopAppBarSection, TopAppBarTitle, TopAppBarRow, TopAppBarIcon } from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";

import ErrorBoundary from "./ErrorBoundary";
import { AppContext } from "./AppContext";
import UserButton from "./UserButton";

function TopBar({ drawerOpen, onDrawerToggle, onNavigateChange }) {

  const [topAppBarSmall, setTopAppBarSmall] = useState(window.innerWidth > 700);

  // Resize top app bar based on window size.
  useEffect(() => {
    // Create listener.
    function onWindowResize() {
      setTopAppBarSmall(window.innerWidth > 700);
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
          <AppContext.Consumer>
            {({ appBarTitle }) =>
              <TopAppBarTitle
                className="align-text-center">
                {appBarTitle}
              </TopAppBarTitle>
            }
          </AppContext.Consumer>
        </TopAppBarSection>
        <TopAppBarSection align="end">
          <ErrorBoundary key="accountButtonErrorBoundary">
            <UserButton
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
  onDrawerToggle: PropTypes.func.isRequired,
  onNavigateChange: PropTypes.func.isRequired,
};

export default TopBar;

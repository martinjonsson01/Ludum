import React, { useState } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemGraphic, ListItemText, ListGroupSubheader, ListDivider } from "@material/react-list";
import Drawer, { DrawerContent, DrawerHeader } from "@material/react-drawer";
import MaterialIcon from "@material/react-material-icon";

import logo from "../../media/logo-144x144.png";
import lbsLogo from "../../media/lbs-logo.png";

function NavigationDrawer({
  drawerOpen,
  selectedIndex,
  navItems,
  onNavigateChange
}) {

  /**
   * All this below is an ugly workaround to fix the connected animation of the profile picture.
   */
  const [dismissible, setDismissible] = useState(false);
  const [actualDrawerOpen, setActualDrawerOpen] = useState(false);
  if (window.innerWidth > 700) {
    setTimeout(() => {
      setDismissible(true);
      setActualDrawerOpen(drawerOpen);
    }, 1);
  } else if (actualDrawerOpen !== drawerOpen || !dismissible) {
    setDismissible(true);
    setActualDrawerOpen(drawerOpen);
  }
  // End of ugly workaround fix.

  return (
    <Drawer
      dismissible={dismissible}
      open={actualDrawerOpen}>
      <DrawerHeader>
        <img src={logo} alt="Ludum logotyp" width="64px" height="64px" />
        <img src={lbsLogo} alt="LBS logotyp" width="auto" height="64px" />
      </DrawerHeader>

      <DrawerContent>
        <List
          id="navList"
          singleSelection selectedIndex={selectedIndex}
          tag="nav">
          {navItems.map((navItem) => [
            // Only render subheader if subHeader has a value.
            navItem.subHeader &&
            <ListGroupSubheader tag='h2'>{navItem.subHeader}</ListGroupSubheader>,

            <ListItem
              tag="a"
              key={navItem.location}
              onClick={() => onNavigateChange(navItem.location)}>
              <ListItemGraphic graphic={<MaterialIcon icon={navItem.icon} />} />
              <ListItemText primaryText={navItem.title} />
            </ListItem>,

            // Only render divider if trailingDivider is true.
            navItem.trailingDivider && <ListDivider />
          ])}
        </List>
      </DrawerContent>
    </Drawer>
  );
}

NavigationDrawer.propTypes = {
  selectedIndex: PropTypes.any,
  drawerOpen: PropTypes.bool,
  navItems: PropTypes.array,
  onNavigateChange: PropTypes.func
};

export default NavigationDrawer;

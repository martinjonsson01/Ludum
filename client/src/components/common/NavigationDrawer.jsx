import React, { Component } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemGraphic, ListItemText, ListGroupSubheader, ListDivider } from "@material/react-list";
import Drawer, { DrawerContent, DrawerHeader, DrawerTitle } from "@material/react-drawer";
import MaterialIcon from "@material/react-material-icon";

import logo from "../../media/logo-144x144.png";
import lbsLogo from "../../media/lbs-logo.png";

export default class NavigationDrawer extends Component {

  static get propTypes() {
    return {
      selectedIndex: PropTypes.any,
      drawerOpen: PropTypes.bool,
      navItems: PropTypes.array,
      navIndexes: PropTypes.array,
      onNavigateChange: PropTypes.func
    };
  }

  render() {
    return (
      <Drawer
        dismissible
        open={this.props.drawerOpen}>
        <DrawerHeader>
          <DrawerTitle tag='h2'>
            Ludum
          </DrawerTitle>
          <img src={logo} alt="Ludum logotyp" width="64px" height="64px" />
          <img src={lbsLogo} alt="LBS logotyp" width="auto" height="64px" />
        </DrawerHeader>

        <DrawerContent>
          <List
            id="navList"
            singleSelection selectedIndex={this.props.selectedIndex}
            tag="nav">
            {this.props.navIndexes.map((index) => [
              // Only render subheader if subHeader has a value.
              this.props.navItems[index].subHeader &&
              <ListGroupSubheader tag='h2'>{this.props.navItems[index].subHeader}</ListGroupSubheader>,

              <ListItem
                tag="a"
                key={this.props.navItems[index].location}
                onClick={() => this.props.onNavigateChange(this.props.navItems[index].location)}>
                <ListItemGraphic graphic={<MaterialIcon icon={this.props.navItems[index].icon} />} />
                <ListItemText primaryText={this.props.navItems[index].title} />
              </ListItem>,

              // Only render divider if trailingDivider is true.
              this.props.navItems[index].trailingDivider && <ListDivider />
            ])}
          </List>
        </DrawerContent>
      </Drawer>
    );
  }
}

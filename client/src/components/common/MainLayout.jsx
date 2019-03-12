import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TopAppBar, { TopAppBarFixedAdjust } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import AccountButton from "./AccountButton";
import Route from "react-router-dom/Route";

import { findWithAttr } from "../../Util";

import ErrorBoundary from "./ErrorBoundary";
import NavigationDrawer from "./NavigationDrawer";

class MainLayout extends Component {

  static get propTypes() {
    return {
      location: PropTypes.any,
      history: PropTypes.any,
      theme: PropTypes.any,
      onToggleTheme: PropTypes.func,
    };
  }

  navIndexes = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ]

  // TODO: Switch out navItems depending on the type of account logged in (e.g. admin, student, etc...)
  navItems = [
    {
      location: "/oversikt",
      title: "Översikt",
      icon: "dashboard",
      trailingDivider: true,
      subHeader: "Start",
    },
    {
      location: "/nyheter",
      title: "Nyheter",
      icon: "announcement",
      trailingDivider: false,
      subHeader: "Relevant",
    },
    {
      location: "/schema",
      title: "Schema",
      icon: "schedule",
      trailingDivider: true,
      subHeader: null,
    },
    {
      location: "/kurser",
      title: "Kurser",
      icon: "school",
      trailingDivider: false,
      subHeader: "Arbete",
    },
    {
      location: "/uppgifter",
      title: "Uppgifter",
      icon: "assignment",
      trailingDivider: false,
      subHeader: null,
    },
    {
      location: "/meddelanden",
      title: "Meddelanden",
      icon: "chat_bubble",
      trailingDivider: true,
      subHeader: null,
    },
    {
      location: "/personal",
      title: "Personal",
      icon: "person",
      trailingDivider: false,
      subHeader: "Personer",
    },
    {
      location: "/elevgrupper",
      title: "Elevgrupper",
      icon: "group",
      trailingDivider: false,
      subHeader: null,
    },
    {
      location: "/installningar",
      title: "Inställningar",
    },
    {
      location: "/profil",
      title: "Profil",
    },
  ];

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const locationIndex = findWithAttr(this.navItems, "location", pathname);
    this.state = {
      selectedIndex: locationIndex,
      title: locationIndex === -1 ? "Null" : this.navItems[locationIndex].title,
      user: null,
    };
  }

  onNavigateChange = (location) => {
    this.props.history.push(location);
    var navItemIndex = findWithAttr(this.navItems, "location", location);
    this.setState({
      selectedIndex: navItemIndex,
      title: this.navItems[navItemIndex].title,
    });
  }

  render() {

    return (
      <div className='drawer-container'>
        <React.StrictMode>
          <ErrorBoundary>
            <NavigationDrawer
              selectedIndex={this.state.selectedIndex}
              navItems={this.navItems}
              navIndexes={this.navIndexes}
              onNavigateChange={this.onNavigateChange} />
          </ErrorBoundary>
        </React.StrictMode>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar
            title={this.state.title}
            fixed={true}
            actionItems={[
              <ErrorBoundary key="accountButtonErrorBoundary">
                <AccountButton
                  onNavigateChange={this.onNavigateChange}
                  theme={this.props.theme}
                  onToggleTheme={this.props.onToggleTheme} />
              </ErrorBoundary>
            ]} />

          <TopAppBarFixedAdjust>
            <ErrorBoundary>
              <Route path="/oversikt" component={this.Overview} />
              <Route path="/schema" component={this.Schedule} />
            </ErrorBoundary>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

export default withRouter(MainLayout);
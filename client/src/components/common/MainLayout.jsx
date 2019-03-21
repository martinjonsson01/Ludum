import React, { Suspense, lazy, Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Route from "react-router-dom/Route";
import TopAppBar, { TopAppBarFixedAdjust, TopAppBarSection, TopAppBarTitle, TopAppBarRow, TopAppBarIcon } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import AccountButton from "./AccountButton";
import LinearProgress from "@material/react-linear-progress";

import { findWithAttr } from "../../Util";

import ErrorBoundary from "./ErrorBoundary";
import NavigationDrawer from "./NavigationDrawer";
import MaterialIcon from "@material/react-material-icon";

// Lazy-load pages.
const OverviewPage = lazy(() => import("../overview/OverviewPage"));
const NewsPage = lazy(() => import("../news/NewsPage"));
const SchedulePage = lazy(() => import("../schedule/SchedulePage"));
const CoursesPage = lazy(() => import("../courses/CoursesPage"));

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
      subHeader: "Relevant",
    },
    {
      location: "/schema",
      title: "Schema",
      icon: "schedule",
      trailingDivider: true,
    },
    {
      location: "/kurser",
      title: "Kurser",
      icon: "school",
      subHeader: "Arbete",
    },
    {
      location: "/uppgifter",
      title: "Uppgifter",
      icon: "assignment",
    },
    {
      location: "/meddelanden",
      title: "Meddelanden",
      icon: "chat_bubble",
      trailingDivider: true,
    },
    {
      location: "/personal",
      title: "Personal",
      icon: "person",
      subHeader: "Personer",
    },
    {
      location: "/elevgrupper",
      title: "Elevgrupper",
      icon: "group",
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
      drawerOpen: true,
      title: locationIndex === -1 ? "Null" : this.navItems[locationIndex].title,
      user: null,
    };
    this.onNavigateChange = this.onNavigateChange.bind(this);
    this.updateBrowserTitle = this.updateBrowserTitle.bind(this);
  }

  componentDidMount() {
    this.updateBrowserTitle();
  }

  componentDidUpdate() {
    this.updateBrowserTitle();
  }

  updateBrowserTitle() {
    const { pathname } = this.props.location;
    const locationIndex = findWithAttr(this.navItems, "location", pathname);
    if (locationIndex === -1) {
      document.title = "Ludum";
      return;
    }
    const title = this.navItems[locationIndex].title;
    document.title = "Ludum - " + title;
  }

  onNavigateChange = (location, hash) => {
    this.props.history.push(`${location}#${hash || ""}`);
    var navItemIndex = findWithAttr(this.navItems, "location", location);
    this.setState({
      selectedIndex: navItemIndex,
      title: this.navItems[navItemIndex].title,
    });
  }

  onDrawerToggle = () => {
    this.setState((prevState) => {
      var topbar = document.getElementById("topbar");
      if (prevState.drawerOpen)
        topbar.classList.remove("mdc-top-app-bar-drawer-fix");
      else
        topbar.classList.add("mdc-top-app-bar-drawer-fix");

      return {
        drawerOpen: !prevState.drawerOpen
      };
    });
  }

  render() {

    return (
      <div className='drawer-container'>
        <React.StrictMode>
          <ErrorBoundary>
            <NavigationDrawer
              selectedIndex={this.state.selectedIndex}
              drawerOpen={this.state.drawerOpen}
              navItems={this.navItems}
              navIndexes={this.navIndexes}
              onNavigateChange={this.onNavigateChange} />
          </ErrorBoundary>
        </React.StrictMode>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar fixed id="topbar" className="mdc-top-app-bar-drawer-fix">
            <TopAppBarRow>
              <TopAppBarSection align="start">
                <TopAppBarIcon navIcon tabIndex={0}>
                  <MaterialIcon
                    hasRipple
                    icon='menu'
                    onClick={this.onDrawerToggle} />
                </TopAppBarIcon>
              </TopAppBarSection>
              <TopAppBarSection>
                <TopAppBarTitle
                  className="align-text-center">
                  {this.state.title}
                </TopAppBarTitle>
              </TopAppBarSection>
              <TopAppBarSection align="end">
                <ErrorBoundary key="accountButtonErrorBoundary">
                  <AccountButton
                    className="top-app-bar-needs-drawer-fix"
                    onNavigateChange={this.onNavigateChange}
                    theme={this.props.theme}
                    onToggleTheme={this.props.onToggleTheme} />
                </ErrorBoundary>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>

          <TopAppBarFixedAdjust>
            <ErrorBoundary>
              <Suspense fallback={<LinearProgress indeterminate={true} />}>
                <Route exact path="/oversikt" component={props => <OverviewPage onNavigateChange={this.onNavigateChange} {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                <Route exact path="/nyheter" component={props => <NewsPage {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                <Route exact path="/schema" component={props => <SchedulePage {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                <Route path="/kurser" component={props => <CoursesPage {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
              </Suspense>
            </ErrorBoundary>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

export default withRouter(MainLayout);
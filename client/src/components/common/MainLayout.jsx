import React, { Suspense, lazy, Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import { TopAppBarFixedAdjust } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import LinearProgress from "@material/react-linear-progress";

import { findWithAttr } from "../../Util";

import ErrorBoundary from "./ErrorBoundary";
import NavigationDrawer from "./NavigationDrawer";
import SignInPage from "../sign-in/SignInPage";
import { AppContext } from "./AppContext";
import TopBar from "./TopBar";

// Lazy-load pages.
const OverviewPage = lazy(() => import("../overview/OverviewPage"));
const NewsPage = lazy(() => import("../news/NewsPage"));
const SchedulePage = lazy(() => import("../schedule/SchedulePage"));
const CoursesPage = lazy(() => import("../courses/CoursesPage"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));

class MainLayout extends Component {

  static get propTypes() {
    return {
      location: PropTypes.any,
      history: PropTypes.any,
      onToggleTheme: PropTypes.func,
    };
  }

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
  ];

  static contextType = AppContext;

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const locationIndex = findWithAttr(this.navItems, "location", pathname);
    this.state = {
      selectedIndex: locationIndex,
      drawerOpen: window.innerWidth > 600,
      topAppBarSmall: window.innerWidth > 600,
    };
    this.onNavigateChange = this.onNavigateChange.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  onWindowResize() {
    this.setState({
      drawerOpen: window.innerWidth > 600
    });
  }

  onNavigateChange = (location, hash) => {
    this.props.history.push(`${location}#${hash || ""}`);
    var navItemIndex = findWithAttr(this.navItems, "location", location);
    this.setState({
      selectedIndex: navItemIndex,
    });
  }

  onDrawerToggle = () => {
    this.setState((prevState) => {
      return {
        drawerOpen: !prevState.drawerOpen
      };
    });
  }

  render() {

    if (!this.context.user) {
      return <SignInPage signInUser={this.context.signInUser} />;
    }

    return (
      <div className='drawer-container'>
        <ErrorBoundary>
          <NavigationDrawer
            selectedIndex={this.state.selectedIndex}
            drawerOpen={this.state.drawerOpen}
            navItems={this.navItems}
            onNavigateChange={this.onNavigateChange} />
        </ErrorBoundary>

        <DrawerAppContent className='drawer-app-content'>
          <TopBar
            drawerOpen={this.state.drawerOpen}
            onDrawerToggle={this.onDrawerToggle}
            onNavigateChange={this.onNavigateChange}
          />
          <TopAppBarFixedAdjust dense={this.state.topAppBarSmall}>
            <ErrorBoundary>
              <Suspense fallback={<LinearProgress indeterminate={true} />}>
                <Switch>
                  <Route path="/kurser" component={props => <CoursesPage onNavigateChange={this.onNavigateChange} {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                  <Route exact path="/oversikt" component={props => <OverviewPage onNavigateChange={this.onNavigateChange} {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                  <Route exact path="/nyheter" component={props => <NewsPage {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                  <Route exact path="/schema" component={props => <SchedulePage {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                  <Route exact path="/" component={props => <Redirect to="/oversikt" {...props} />} /> {/** TODO: Fix this to not use a closure. Wait for react-router-dom v4.4 */}
                  <Route component={props => <NotFoundPage {...props} />} />
                </Switch>
              </Suspense>
            </ErrorBoundary>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

export default withRouter(MainLayout);
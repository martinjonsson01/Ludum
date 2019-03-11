import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer';
import MaterialIcon from '@material/react-material-icon';
import List, { ListItem, ListItemGraphic, ListItemText, ListGroupSubheader, ListDivider } from '@material/react-list';
import AccountButton from '../AccountButton/AccountButton';

import './MainLayout.scss';
import Route from 'react-router-dom/Route';

import logo from '../../media/LoggaLudum.png';
import lbsLogo from '../../media/lbs-logo.png';

class MainLayout extends Component {

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

  actionItems = [
    <MaterialIcon icon="menu" />
  ];

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const locationIndex = this.findWithAttr(this.navItems, "location", pathname);
    this.state = {
      selectedIndex: locationIndex,
      title: locationIndex === -1 ? "Null" : this.navItems[locationIndex].title,
      user: null,
    };
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  Overview = () => (<div>Översikt</div>);
  Schedule = () => (<div>Schema</div>);

  onNavigateChange = (location) => {
    this.props.history.push(location);
    var navItemIndex = this.findWithAttr(this.navItems, "location", location);
    this.setState({
      selectedIndex: navItemIndex,
      title: this.navItems[navItemIndex].title,
    });
  }

  render() {

    return (
      <div className='drawer-container'>
        <Drawer>
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
              singleSelection selectedIndex={this.state.selectedIndex}
              tag="nav">
              {this.navIndexes.map((index) => [
                // Only render subheader if subHeader has a value.
                this.navItems[index].subHeader &&
                <ListGroupSubheader tag='h2'>{this.navItems[index].subHeader}</ListGroupSubheader>,

                <ListItem tag="a" onClick={() => this.onNavigateChange(this.navItems[index].location)}>
                  <ListItemGraphic graphic={<MaterialIcon icon={this.navItems[index].icon} />} />
                  <ListItemText primaryText={this.navItems[index].title} />
                </ListItem>,

                // Only render divider if trailingDivider is true.
                this.navItems[index].trailingDivider && <ListDivider />
              ])}
            </List>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar
            title={this.state.title}
            fixed={true}
            actionItems={[<AccountButton onNavigateChange={this.onNavigateChange} />]} />

          <TopAppBarFixedAdjust>
            <Route path="/oversikt" component={this.Overview} />
            <Route path="/schema" component={this.Schedule} />
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

export default withRouter(MainLayout);
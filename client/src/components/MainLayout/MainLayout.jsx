import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer';
import MaterialIcon from '@material/react-material-icon';
import List, { ListItem, ListItemGraphic, ListItemText, ListGroupSubheader, ListDivider } from '@material/react-list';

import './MainLayout.scss';
import Route from 'react-router-dom/Route';

import logo from '../../logo.svg';

class MainLayout extends Component {

  // TODO: Switch out navItems depending on the type of account logged in (e.g. admin, student, etc...)
  navItems = [
    {
      location: "/oversikt",
      text: "Översikt",
      icon: "dashboard",
      trailingDivider: true,
      subHeader: "Start",
    },
    {
      location: "/nyheter",
      text: "Nyheter",
      icon: "announcement",
      trailingDivider: false,
      subHeader: "Relevant",
    },
    {
      location: "/schema",
      text: "Schema",
      icon: "schedule",
      trailingDivider: true,
      subHeader: null,
    },
    {
      location: "/kurser",
      text: "Kurser",
      icon: "school",
      trailingDivider: false,
      subHeader: "Arbete",
    },
    {
      location: "/uppgifter",
      text: "Uppgifter",
      icon: "assignment",
      trailingDivider: false,
      subHeader: null,
    },
    {
      location: "/meddelanden",
      text: "Meddelanden",
      icon: "chat_bubble",
      trailingDivider: true,
      subHeader: null,
    },
    {
      location: "/personal",
      text: "Personal",
      icon: "person",
      trailingDivider: false,
      subHeader: "Personer",
    },
    {
      location: "/elevgrupper",
      text: "Elevgrupper",
      icon: "group",
      trailingDivider: false,
      subHeader: null,
    },
  ];

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const locationIndex = this.findWithAttr(this.navItems, "location", pathname);
    this.state = { selectedIndex: locationIndex };
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

  navigate(index) {
    this.props.history.push(this.navItems[index].location);
    this.setState({ selectedIndex: index });
  }

  render() {
    const title = this.state.selectedIndex === -1 ?
      "Null" : this.navItems[this.state.selectedIndex].text;

    return (
      <div className='drawer-container'>
        <Drawer>
          <DrawerHeader>
            <DrawerTitle tag='h2'>
              Ludum
            </DrawerTitle>
            <img src={logo} alt="Ludum logotyp" width="64px" height="64px" />
          </DrawerHeader>

          <DrawerContent>
            <List singleSelection selectedIndex={this.state.selectedIndex} tag="nav">
              {this.navItems.map((item, index) => [
                // Only render subheader if subHeader has a value.
                this.navItems[index].subHeader &&
                 <ListGroupSubheader tag='h2'>{this.navItems[index].subHeader}</ListGroupSubheader>,
               
               <ListItem tag="a" onClick={() => this.navigate(index)}>
                  <ListItemGraphic graphic={<MaterialIcon icon={this.navItems[index].icon} />} />
                  <ListItemText primaryText={this.navItems[index].text} />
                </ListItem>,
                
                // Only render divider if trailingDivider is true.
                this.navItems[index].trailingDivider && <ListDivider />
              ])}
            </List>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar
            title={title}
          //navigationIcon={<MaterialIcon icon='menu' />}
          />

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
import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material/react-button";
import IconButton from "@material/react-icon-button";
import MaterialIcon from "@material/react-material-icon";
import MenuSurface, { Corner } from "@material/react-menu-surface";
import { Subtitle1, Headline6 } from "@material/react-typography";

import defaultProfile from "../../media/defaultProfile.png";

export default class AccountButton extends Component {

  static get propTypes() {
    return {
      user: PropTypes.any,
      theme: PropTypes.any,
      onToggleTheme: PropTypes.func,
      onNavigateChange: PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      anchorElement: null,
    };
  }

  setAnchorElement = (element) => {
    if (this.state.anchorElement) {
      return;
    }
    this.setState({ anchorElement: element });
  }

  toggleMenu = () => {
    this.setState((state) => {
      return { menuOpen: !state.menuOpen };
    });
  }

  render() {

    const profileImage = this.props.user ?
      this.props.user.profileImage : defaultProfile;

    return (
      <div className="account" >
        {/** Profile Image */}
        <img
          src={profileImage}
          alt="Profilbild"
          className='mdc-menu-surface--anchor'
          ref={this.setAnchorElement}
          onClick={this.toggleMenu} />
        {/** Menu Surface */}
        <MenuSurface
          open={this.state.menuOpen}
          anchorCorner={Corner.BOTTOM_LEFT}
          onClose={() => this.setState({ menuOpen: false })}
          anchorElement={this.state.anchorElement}
          anchorMargin={{ top: 0, bottom: 16, left: 0, right: 8 }}
          quickOpen={false}>
          <div
            id="grid">
            {/** Namn */}
            <Headline6
              id="name">
              {this.props.user ? this.props.user.fullName : "Förnamn Efternamn"}
            </Headline6>
            {/** E-mail */}
            <Subtitle1
              id="email">
              {this.props.user ? this.props.user.mail : "förnamn.efternamn@elev.ga.lbs.se"}
            </Subtitle1>
            {/** Profil */}
            <Button
              id="profile"
              unelevated={true}
              onClick={() => this.props.onNavigateChange("/profil")}>
              Profil
            </Button>
            {/** Dark mode */}
            <IconButton
              id="dark-mode"
              onClick={this.props.onToggleTheme}>
              {
                // Render moon icon if current theme is light; sun icon if theme is dark.
                this.props.theme === "light" ?
                  <MaterialIcon icon='brightness_3' /> :
                  <MaterialIcon icon='brightness_7' />
              }
            </IconButton>
            {/** Settings */}
            <IconButton
              id="settings"
              onClick={() => this.props.onNavigateChange("/installningar")}>
              <MaterialIcon icon="settings" />
            </IconButton>
            {/** Sign-out */}
            <Button
              id="sign-out">
              Logga ut
            </Button>
          </div>
        </MenuSurface>
      </div>
    );
  }
}

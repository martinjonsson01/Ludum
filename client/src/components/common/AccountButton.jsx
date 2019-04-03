import React, { Component } from "react";
import PropTypes from "prop-types";
import { SharedElement } from "@taito/react-sheltr";

import defaultProfile from "../../media/defaultProfile.png";
import { ThemeContext } from "./ThemeContext";
import { UserContext } from "./UserContext";
import AccountSurface from "./AccountSurface";

export default class AccountButton extends Component {

  static get propTypes() {
    return {
      user: PropTypes.any,
      onNavigateChange: PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      anchorElement: null,
    };
    this.setAnchorElement = this.setAnchorElement.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {

    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) =>
          (<UserContext.Consumer>
            {({ user, signOutUser }) =>
              <div className="account" >
                {/** Profile Image */}
                <SharedElement sharedId="logo" startOnUnmount>
                  {sheltrProps =>
                    <img
                      {...sheltrProps}
                      src={user ? user.picture : defaultProfile}
                      alt="Profilbild"
                      className='mdc-menu-surface--anchor'
                      ref={this.setAnchorElement}
                      onClick={this.toggleMenu}
                    />
                  }
                </SharedElement>
                {/** Menu Surface */}
                <AccountSurface
                  theme={theme}
                  toggleTheme={toggleTheme}
                  user={user}
                  signOutUser={signOutUser}
                  anchorElement={this.state.anchorElement}
                  closeMenu={this.closeMenu}
                  menuOpen={this.state.menuOpen}
                  onNavigateChange={this.props.onNavigateChange}
                />
              </div>
            }
          </UserContext.Consumer>)}
      </ThemeContext.Consumer>
    );
  }
}

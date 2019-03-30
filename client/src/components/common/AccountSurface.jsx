import React from "react";
import PropTypes from "prop-types";
import Button from "@material/react-button";
import IconButton from "@material/react-icon-button";
import MaterialIcon from "@material/react-material-icon";
import MenuSurface, { Corner } from "@material/react-menu-surface";
import { Subtitle1, Headline6 } from "@material/react-typography";

function AccountSurface({
  user,
  signOutUser,
  menuOpen,
  closeMenu,
  onNavigateChange,
  anchorElement,
  theme,
  toggleTheme
}) {

  function navigateToProfile() {
    onNavigateChange("/profil");
  }

  function navigateToSettings() {
    onNavigateChange("/installningar");
  }

  return (
    <MenuSurface
      open={menuOpen}
      anchorCorner={Corner.BOTTOM_LEFT}
      onClose={closeMenu}
      anchorElement={anchorElement}
      anchorMargin={{ top: 0, bottom: 16, left: 0, right: 8 }}
      quickOpen={false}>
      <div
        id="grid">
        {/** Namn */}
        <Headline6
          id="name">
          {user ? user.profileObj.name : "Förnamn Efternamn"}
        </Headline6>
        {/** E-mail */}
        <Subtitle1
          id="email">
          {user ? user.profileObj.email : "förnamn.efternamn@elev.ga.lbs.se"}
        </Subtitle1>
        {/** Profil */}
        <Button
          id="profile"
          unelevated={true}
          onClick={navigateToProfile}>
          Profil
        </Button>
        {/** Dark mode */}
        <IconButton
          id="dark-mode"
          onClick={toggleTheme}>
          {
            // Render moon icon if current theme is light; sun icon if theme is dark.
            theme === "light" ?
              <MaterialIcon icon='brightness_3' /> :
              <MaterialIcon icon='brightness_7' />
          }
        </IconButton>
        {/** Settings */}
        <IconButton
          id="settings"
          onClick={navigateToSettings}>
          <MaterialIcon icon="settings" />
        </IconButton>
        {/** Sign-out */}
        <Button
          id="sign-out"
          onClick={signOutUser}>
          Logga ut
        </Button>
      </div>
    </MenuSurface>
  );
}

AccountSurface.propTypes = {
  user: PropTypes.object.isRequired,
  signOutUser: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  onNavigateChange: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  anchorElement: PropTypes.object,
};

export default AccountSurface;

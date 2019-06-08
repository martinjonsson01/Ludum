import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MaterialIcon from "@material/react-material-icon";
import MenuSurface, { Corner } from "@material/react-menu-surface";
import { Subtitle1, Headline6 } from "@material/react-typography";
import Switch from "@material/react-switch";
import "@material/react-switch/index.scss";

import { AppContext } from "./AppContext";
import defaultProfile from "../../media/defaultProfile.png";

/*
 * Component.
 */
function UserSurface({ onNavigateChange, menuOpen, closeMenu, anchorElement }) {

  const { user, theme, toggleTheme, signOutUser } = useContext(AppContext);

  function navigateToProfile() {
    onNavigateChange("/profil");
    closeMenu();
  }

  function navigateToSettings() {
    onNavigateChange("/installningar");
    closeMenu();
  }

  return (
    <StyledMenuSurface
      open={menuOpen}
      anchorCorner={Corner.BOTTOM_LEFT}
      onClose={closeMenu}
      anchorElement={anchorElement}
      anchorMargin={{ top: 0, bottom: 16, left: 0, right: 0 }}
      quickOpen={false}
    >
      <Contents>
        {/** User Info Header */}
        <Header onClick={navigateToProfile}>
          <Avatar
            src={user ? user.picture : defaultProfile}
            alt="Profilbild"
          />
          <Name>{user ? user.name : "Förnamn Efternamn"}</Name>
          <Email>{user ? user.email : "förnamn.efternamn@elev.ga.lbs.se"}</Email>
        </Header>
        <Divider />
        {/** Sign-out button */}
        <MenuItem onClick={signOutUser}>
          <StyledIcon icon="exit_to_app" />
          <MenuItemText>Logga ut</MenuItemText>
        </MenuItem>
        <Divider />
        {/** Theme toggle switch */}
        <MenuItem onClick={toggleTheme}>
          <StyledIcon icon={theme === "light" ? "brightness_7" : "brightness_3"} />
          <label htmlFor="theme-switch">
            <MenuItemText>Mörkt tema</MenuItemText>
          </label>
          <EmptyMargin />
          <StyledSwitch
            nativeControlId="theme-switch"
            checked={theme === "dark"}
          />
        </MenuItem>
        {/** Settings button */}
        <MenuItem onClick={navigateToSettings}>
          <StyledIcon icon="settings" />
          <MenuItemText>Inställningar</MenuItemText>
        </MenuItem>
      </Contents>
    </StyledMenuSurface>
  );
}

/*
 * Props.
 */
UserSurface.propTypes = {
  onNavigateChange: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  anchorElement: PropTypes.object
};

/*
 * Styling. 
 */
const StyledMenuSurface = styled(MenuSurface)`
  border-radius: 1rem;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 18.75rem;
  overflow: hidden;
`;
const Divider = styled.div`
  height: 1px;
  background: var(--mdc-theme-border);
`;
const MenuItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: 100%;
  min-height: 2.5rem;
  padding: 0 1.25rem 0 1rem;

  &:before {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    content: "";
    
    transition: opacity 15ms linear, background-color 15ms linear;
    z-index: 1;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: var(--mdc-theme-text-title);
  }
  &:hover:before {
    opacity: 0.05;
  }
  &:active:before {
    opacity: 0.1;
  }
`;
const StyledIcon = styled(MaterialIcon)`
  color: var(--mdc-theme-text-title) !important;
`;
const EmptyMargin = styled.div`
  flex-grow: 1;
  flex-basis: 0.000000001px;
`;
const StyledSwitch = styled(Switch)`
`;
const MenuItemText = styled(Subtitle1)`
  margin-left: 1rem;
`;
const Header = styled(MenuItem)`
  display: grid;
  height: 4.625rem;
  cursor: pointer;
  grid-template-columns: 3.5rem auto;
  grid-template-rows: 1.25rem 1.3125rem;
  grid-template-areas: 
    "avatar name"
    "avatar email";
  padding: 1rem;
`;
const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  border-radius: 50%;
  grid-area: avatar;
`;
const Name = styled(Headline6)`
  grid-area: name;
  color: var(--mdc-theme-text-title);
  font-family: Montserrat, Roboto, sans-serif !important;
  font-size: 1em !important;
  font-weight: 500 !important;
  line-height: 1.25rem !important;

  /** Don't let text overflow, put ellipsis at end. */
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;
const Email = styled(Subtitle1)`
  grid-area: email;
  font-size: 0.875em !important;
  line-height: 1.3125rem !important;

  /** Don't let text overflow, put ellipsis at end. */
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;

export default UserSurface;

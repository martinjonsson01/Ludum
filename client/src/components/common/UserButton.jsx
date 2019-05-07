import React, { useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SharedElement } from "@taito/react-sheltr";

import defaultProfile from "../../media/defaultProfile.png";
import { AppContext } from "./AppContext";
import UserSurface from "./UserSurface";

/**
 * Component.
 */
function UserButton({ onNavigateChange }) {

  const { user } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorElementRef = useRef();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <React.Fragment>
      {/** Profile Image */}
      <SharedElement sharedId="logo" startOnUnmount>
        {sheltrProps =>
          <ProfileImage
            {...sheltrProps}
            src={user ? user.picture : defaultProfile}
            alt="Profilbild"
            className='mdc-menu-surface--anchor'
            ref={anchorElementRef}
            onClick={toggleMenu}
          />
        }
      </SharedElement>
      {/** Menu Surface */}
      <UserSurface
        anchorElement={anchorElementRef.current}
        closeMenu={closeMenu}
        menuOpen={menuOpen}
        onNavigateChange={onNavigateChange}
      />
    </React.Fragment>
  );
}

/**
 * Props.
 */
UserButton.propTypes = {
  onNavigateChange: PropTypes.func.isRequired
};

/**
 * Styling.
 */
const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: auto 1rem;
`;

export default UserButton;

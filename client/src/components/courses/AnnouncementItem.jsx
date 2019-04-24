import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "@material/react-card";
import MaterialIcon from "@material/react-material-icon";
import { Body1 } from "@material/react-typography";

import { AppContext } from "../common/AppContext";
import MaterialsList from "./MaterialsList";
import { formatDate } from "../../Util";

/**
 * Component.
 */
function AnnouncementItem({ event, accentColor }) {

  const { theme } = useContext(AppContext);
  const publishDate = formatDate(new Date(event.created_at));
  const editDate = formatDate(new Date(event.updated_at));

  return (
    <li key={event.content}>
      <StyledCard theme={theme}>
        <Content>
          <Icon icon="announcement" iconcolor={accentColor} />
          <Body>{event.content}</Body>
          <Dates>
            {/** Publish date */}
            <Body1>{publishDate}</Body1>
            {/** Edit date */}
            {editDate === publishDate ? "" :
              <i><Body1>Redigerad {editDate}</Body1></i>
            }
          </Dates>
        </Content>
        <MaterialsList
          event={event}
          accentColor={accentColor}
        />
      </StyledCard>
    </li>
  );
}

/**
 * Props.
 */
AnnouncementItem.propTypes = {
  event: PropTypes.object.isRequired,
  accentColor: PropTypes.string,
};

/**
 * Styles.
 */
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 0.05rem solid #000;
  border-color: ${props => props.theme === "dark" ? "#000" : "#dadce0"};
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
const Icon = styled(MaterialIcon)`
  font-size: 2rem !important;
  color: ${props => `#${props.iconcolor}`};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Body = styled(Body1)`
  margin: auto;
  margin-left: 1rem;
  height: fit-content;
  flex-grow: 1;
`;
const Dates = styled.div`
  margin-left: 2rem;
`;

export default AnnouncementItem;

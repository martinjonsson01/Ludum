import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText, ListItemGraphic } from "@material/react-list";
import MaterialIcon from "@material/react-material-icon";

function CourseEventItem(props) {

  const courseEvent = props.listItem;

  const key = courseEvent.course + ":" + courseEvent.event.type.name + ":" + courseEvent.event.name;

  return (
    <ListItem
      key={key}>
      <ListItemGraphic
        graphic={<MaterialIcon icon={courseEvent.event.type.icon} />} />
      <ListItemText
        primaryText={courseEvent.course + " - " + courseEvent.event.type.name}
        secondaryText={courseEvent.event.name} />
    </ListItem>
  );
}

CourseEventItem.propTypes = {
  listItem: PropTypes.object,
};

export default CourseEventItem;

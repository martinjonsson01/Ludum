import React from "react";
import { ListItem, ListItemText, ListItemGraphic, ListDivider } from "@material/react-list";
import MaterialIcon from "@material/react-material-icon";

function CourseEventItem(props) {

  const courseEvent = props.listItem;
  const courseEventList = props.array;
  const index = props.index;

  const key = courseEvent.course + ":" + courseEvent.event.type.name + ":" + courseEvent.event.name;

  return ([
    <ListItem
      key={key}>
      <ListItemGraphic
        graphic={<MaterialIcon icon={courseEvent.event.type.icon} />} />
      <ListItemText
        primaryText={courseEvent.course + " - " + courseEvent.event.type.name}
        secondaryText={courseEvent.event.name} />
    </ListItem>,
    // Only render ListDivider if not last item.
    courseEventList.length - 1 === index ? "" :
      <ListDivider
        key={key + "_divider"} />
  ]);
}

export default CourseEventItem;

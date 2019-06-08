import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText, ListItemGraphic } from "@material/react-list";

function NewsSummaryItem(props) {

  const newsItem = props.listItem;

  function onClick() {
    // Navigate to /nyheter#title-of-news.
    props.onNavigateChange("/nyheter", encodeURI(newsItem.title));
  }

  return (
    <ListItem
      key={newsItem.title + ":" + newsItem.date}
      onClick={onClick}>
      <ListItemGraphic
        graphic={<img src={newsItem.avatar_url} alt={newsItem.first_name + " " + newsItem.last_name} />} />
      <ListItemText
        primaryText={newsItem.title}
        secondaryText={`${newsItem.body.substring(0, 100)}...`} />
    </ListItem>
  );
}

NewsSummaryItem.propTypes = {
  listItem: PropTypes.object,
  onNavigateChange: PropTypes.func,
};

export default NewsSummaryItem;

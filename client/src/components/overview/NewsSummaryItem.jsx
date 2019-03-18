import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText, ListItemGraphic, ListDivider } from "@material/react-list";

function NewsSummaryItem(props) {

  const newsItem = props.listItem;
  const news = props.array;
  const index = props.index;

  function onClick() {
    // Navigate to /nyheter#title-of-news.
    props.onNavigateChange("/nyheter", encodeURI(newsItem.title));
  }

  return ([
    <ListItem
      key={newsItem.title + ":" + newsItem.date}
      onClick={onClick}>
      <ListItemGraphic
        graphic={<img src={newsItem.author.image} alt={newsItem.author.name} />} />
      <ListItemText
        primaryText={newsItem.title}
        secondaryText={`${newsItem.body.substring(0, 100)}...`} />
    </ListItem>,
    // Only render ListDivider if not last item.
    news.length - 1 === index ? "" :
      <ListDivider
        key={newsItem.title + ":" + newsItem.date + "_divider"} />
  ]);
}

NewsSummaryItem.propTypes = {
  listItem: PropTypes.object,
  array: PropTypes.array,
  index: PropTypes.number,
  onNavigateChange: PropTypes.func,
};

export default NewsSummaryItem;

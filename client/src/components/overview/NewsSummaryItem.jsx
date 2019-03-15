import React from "react";
import { ListItem, ListItemText, ListItemGraphic, ListDivider } from "@material/react-list";

function NewsSummaryItem(props) {

  const newsItem = props.listItem;
  const news = props.array;
  const index = props.index;

  return ([
    <ListItem
      key={newsItem.title + ":" + newsItem.date}>
      <ListItemGraphic
        graphic={<img src={newsItem.author.image} alt={newsItem.author.name} />} />
      <ListItemText
        primaryText={newsItem.title}
        secondaryText={newsItem.body} />
    </ListItem>,
    // Only render ListDivider if not last item.
    news.length - 1 === index ? "" :
      <ListDivider
        key={newsItem.title + ":" + newsItem.date + "_divider"} />
  ]);
}

export default NewsSummaryItem;

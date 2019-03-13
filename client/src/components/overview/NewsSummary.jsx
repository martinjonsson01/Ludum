import React from "react";
import List, { ListItem, ListItemText, ListItemGraphic, ListDivider } from "@material/react-list";
import useFetch from "fetch-suspense";

function NewsSummary() {

  const news = useFetch("http://localhost:3001/api/getNews", { method: "GET" });

  return (
    <React.Fragment>
      <List
        twoLine={true}
        avatarList={true}>
        {news.map((newsItem) => [
          <ListItem
            key={newsItem.title + ":" + newsItem.date}>
            <ListItemGraphic
              graphic={<img src={newsItem.author.image} alt={newsItem.author.name} />} />
            <ListItemText
              primaryText={newsItem.title}
              secondaryText={newsItem.body} />
          </ListItem>,
          <ListDivider key={newsItem.title + ":" + newsItem.date + "_divivder"} />
        ])}
      </List>
    </React.Fragment>
  );
}

export default NewsSummary;

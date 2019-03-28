import React, { useState } from "react";
import styled from "styled-components";
import Card from "@material/react-card";
import { Body1, Headline5, Headline6 } from "@material/react-typography";
import { Snackbar } from "@material/react-snackbar";
import MaterialIcon from "@material/react-material-icon";
import IconButton from "@material/react-icon-button";
import { writeText } from "../../Util";

/**
 * NewsItem styling.
 */
const NewsItemContainer = styled.li`
  margin: 1.5rem;
  margin-top: 0;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;
const NewsItemContent = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "top-bar"
    "body"; 
  padding: 1rem;
  white-space: pre-line !important;
`;
const TopBar = styled.div`
  grid-area: top-bar;
  margin-bottom: 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: start;
`;
const AuthorImage = styled.img`
  width: 48px;
  height: 48px;
  margin: auto 1rem auto 0;
  border-radius: 50%;
`;
const TitleContainer = styled.div`
  margin: 0.5rem 0 0 4rem;
  display: flex;
`;
const BodyArea = styled.div`
  grid-area: body;
  height: fit-content;
  margin: 1rem 4rem 0 4rem;
`;
const Author = styled.div`
  display: flex;
`;

/**
 * NewsItem component.
 */
function NewsItem(props) {

  const newsItem = props.listItem;

  const [copiedLink, setCopiedLink] = useState(false);

  function onCopyLink() {
    writeText(`${window.location.origin}${window.location.pathname}#${encodeURI(newsItem.title)}`);
    setCopiedLink(true);
  }

  function onSnackbarDismiss() {
    setCopiedLink(false);
  }

  return ([
    <NewsItemContainer
      id={encodeURI(newsItem.title)}
      key={newsItem.title + ":" + newsItem.date}>
      <Card>
        <NewsItemContent>
          {/** Top bar */}
          <TopBar>
            {/** Author info */}
            <Author>
              {/** Author image */}
              <AuthorImage src={newsItem.author.image} alt={newsItem.author.name} />
              <div>
                {/** Author name */}
                <Headline6>{newsItem.author.name}</Headline6>
                {/** Publish date */}
                <Body1>{newsItem.date}</Body1>
              </div>
            </Author>
            <TitleContainer>
              {/** Title */}
              <Headline5 className="vertical-align">{newsItem.title}</Headline5>
              {/** Copy link button */}
              <IconButton
                onClick={onCopyLink}>
                <MaterialIcon icon="link" />
              </IconButton>
            </TitleContainer>
          </TopBar>
          {/** News body */}
          <BodyArea>
            <Body1>{newsItem.body}</Body1>
          </BodyArea>
          {
            copiedLink ?
              <Snackbar
                leading
                message="Kopierade länk till nyhet"
                actionText="Avfärda"
                onClose={onSnackbarDismiss}
              />
              : ""
          }
        </NewsItemContent>
      </Card>
    </NewsItemContainer>
  ]);
}

export default NewsItem;

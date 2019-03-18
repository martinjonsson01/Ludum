import React from "react";
import styled from "styled-components";
import Card from "@material/react-card";
import { Body1, Headline5, Headline6 } from "@material/react-typography";

/**
 * NewsItem styling.
 */
const NewsItemContainer = styled.li`
  margin: 1.5rem;
  margin-top: 0;
`;
const NewsItemContent = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "top-bar"
    "body"; 
  padding: 1rem;
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
            {/** Title */}
            <TitleContainer>
              <Headline5>{newsItem.title}</Headline5>
            </TitleContainer>
          </TopBar>
          {/** News body */}
          <BodyArea>
            <Body1>{newsItem.body}</Body1>
          </BodyArea>
        </NewsItemContent>
      </Card>
    </NewsItemContainer>
  ]);
}

export default NewsItem;

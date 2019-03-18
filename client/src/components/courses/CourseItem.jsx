import React from "react";
import styled from "styled-components";
import { Body1, Headline5, Headline6 } from "@material/react-typography";

/**
 * CourseItem styling.
 */
const Container = styled.li`
  margin: 1.5rem;
  margin-top: 0;
`;
const Content = styled.div`
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
const TeacherImage = styled.img`
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
const Teacher = styled.div`
  display: flex;
`;

/**
 * CourseItem component.
 */
function CourseItem(props) {

  const courseItem = props.listItem;

  return ([
    <Container
      id={encodeURI(courseItem.title)}
      key={courseItem.title + ":" + courseItem.date}>
      <Content>
        {/** Top bar */}
        <TopBar>
          {/** Teacher info */}
          <Teacher>
            {/** Teacher image */}
            <TeacherImage src={courseItem.teachers[0].image} alt={courseItem.teachers[0].name} />
            <div>
              {/** Teacher name */}
              <Headline6>{courseItem.teachers[0].name}</Headline6>
            </div>
          </Teacher>
          {/** Title */}
          <TitleContainer>
            <Headline5>{courseItem.name}</Headline5>
          </TitleContainer>
        </TopBar>
        {/** News body */}
        <BodyArea>
          <Body1>{courseItem.body}</Body1>
        </BodyArea>
      </Content>
    </Container>
  ]);
}

export default CourseItem;

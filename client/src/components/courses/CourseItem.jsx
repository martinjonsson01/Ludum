import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Headline5, Headline6 } from "@material/react-typography";
import { ListItem } from "@material/react-list";

/**
 * CourseItem styling.
 */
const ListItemStyled = styled(ListItem)`
  height: fit-content !important;
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
const Teacher = styled.div`
  display: flex;
`;

/**
 * CourseItem component.
 */
function CourseItem(props) {

  const courseItem = props.listItem;

  function onClick() {
    // Navigate to /kurser/kurs-kod.
    props.onNavigateChange(`/kurser/${encodeURI(courseItem.course_code)}/flode`);
  }

  return (
    <ListItemStyled
      id={encodeURI(courseItem.course_code)}
      onClick={onClick}>
      <Content>
        {/** Top bar */}
        <TopBar>
          {/** Teacher info */}
          <Teacher>
            {/** Teacher image */}
            <TeacherImage src={courseItem.teacher_avatar_url} alt={courseItem.teacher_name} />
            <div>
              {/** Teacher name */}
              <Headline6>{courseItem.teacher_name}</Headline6>
            </div>
          </Teacher>
          {/** Title */}
          <TitleContainer>
            <Headline5>{courseItem.course_name}</Headline5>
          </TitleContainer>
        </TopBar>
      </Content>
    </ListItemStyled>
  );
}

CourseItem.propTypes = {
  listItem: PropTypes.object,
  onNavigateChange: PropTypes.func,
};

export default CourseItem;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Headline5, Body1 } from "@material/react-typography";
import { ListItem } from "@material/react-list";

/**
 * CourseItem component.
 */
function CourseItem({ listItem: course, onNavigateChange }) {

  function onClick() {
    // Navigate to /kurser/kurs-kod/flode.
    onNavigateChange(`/kurser/${encodeURI(course.course_code)}/flode`);
  }

  return (
    <ListItemStyled
      id={encodeURI(course.course_code)}
      onClick={onClick}>
      <Content>
        {/** Title */}
        <TitleContainer>
          <Headline5>{course.course_name}</Headline5>
        </TitleContainer>
        {/** Teacher info */}
        <Teacher>
          {/** Teacher name */}
          <Body1>{course.teacher_name}</Body1>
          {/** Teacher image */}
          <TeacherImage
            src={course.teacher_avatar_url}
            alt={course.teacher_name}
          />
        </Teacher>
      </Content>
      <BackgroundImage
        bannerurl={course.course_banner_url}
        tintcolor={course.course_accent_color_dark}
      />
    </ListItemStyled>
  );
}

CourseItem.propTypes = {
  listItem: PropTypes.object,
  onNavigateChange: PropTypes.func,
};

/**
 * CourseItem styling.
 */
const ListItemStyled = styled(ListItem)`
  position: relative;
  height: fit-content !important;
  border-radius: 1rem;
  --mdc-theme-on-background: white;
`;
const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => `url(${props.bannerurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${props => `#${props.tintcolor}`};
  background-blend-mode: multiply;
  border-radius: 1rem;
`;
const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "top-bar"
    "body"; 
  padding: 1rem 0;
`;
const TeacherImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover; /* Scale the image to cover element. */
  object-position: center; /* Center the image within the element. */
`;
const TitleContainer = styled.div`

`;
const Teacher = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default CourseItem;

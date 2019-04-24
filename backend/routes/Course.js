const db = require("../db");
const asyncHandler = require("express-async-handler");

const getCourses = asyncHandler(async (req, res) => {
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Await query for user courses.
  // Tbh this query was cancer to set up...
  const [courses] = await pool.execute(`
    SELECT
      course.course_name,
      course.id AS course_code,
      course.banner_url AS course_banner_url,
      course.accent_color AS course_accent_color,
      course.accent_color_dark AS course_accent_color_dark,
      student_group.id AS student_group_id,
      student_group.group_name AS student_group_name,
      CONCAT(teacher.first_name, ' ', teacher.last_name) AS teacher_name,
      teacher.avatar_url AS teacher_avatar_url
    FROM course
      JOIN student_group
        ON course.student_group_id = student_group.id
      JOIN user_student_groups
        ON student_group.id = user_student_groups.student_group_id
      JOIN user student
        ON user_student_groups.user_id = student.id
      JOIN user_courses
        ON course.id = user_courses.course_id
      JOIN user teacher
        ON user_courses.user_id = teacher.id
    WHERE student.id = ?;
  `, [req.session.user.sub]);

  // Organize courses into arrays by student group ID.
  let orderedCourses = {};
  for (var i = 0; i < courses.length; i++) {
    const course = courses[i];
    let studentGroupCourseArray = orderedCourses[course.student_group_id];
    // If a student group course array already exists.
    if (studentGroupCourseArray) {
      // If course already is in student group course array.
      if (studentGroupCourseArray.some(otherCourse => otherCourse.course_code === course.course_code)) {
        // TODO: Append teacher info to actual course object.
      } else {
        studentGroupCourseArray.push(course);
      }
    } else {
      orderedCourses[course.student_group_id] = [course];
    }
  }

  // Respond with ordered courses.
  res.json(orderedCourses);
});

const getCourseEvents = (req, res) => {
  // TODO: REMOVE THIS 1000 MS TIMEOUT ASAP
  setTimeout(() =>
    res.json([
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Ma3c",
        event: {
          date: "3 mars",
          type: {
            name: "Bedömt prov",
            icon: "assignment_returned",
          },
          name: "Kapitel 5 - Trigonometri",
        },
      },
      {
        course: "Fysik 1",
        event: {
          date: "1 mars",
          type: {
            name: "Bedömd uppgift",
            icon: "assignment_returned",
          },
          name: "Ellabb 2",
        },
      },
      {
        course: "Fysik 1",
        event: {
          dueDate: "22 februari",
          type: {
            name: "Ny uppgift",
            icon: "assignment",
          },
          name: "Ellabb 2",
        },
      },
    ]), 1000);
};

const getCourse = asyncHandler(async (req, res) => {
  const courseCode = req.params.code;
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Await query on course table.
  const [courses] = await pool.execute(`
    SELECT
      course.id,
      course.course_name,
      course.banner_url,
      course.accent_color,
      course.accent_color_dark,
      CONCAT(teacher.first_name, ' ', teacher.last_name) AS teacher_name,
      teacher.avatar_url AS teacher_avatar_url
    FROM course
      JOIN user_courses
        ON course.id = user_courses.course_id
      JOIN user teacher
        ON user_courses.user_id = teacher.id
    WHERE course.id = ?
  `, [courseCode]);
  // If one result was not returned by database.
  if (courses.length <= 0) {
    return res
      .status(404) // NOT FOUND.
      .send(`Kunde inte hitta en kurs med kod "${courseCode}"`);
  }
  // Respond with course-data.
  return res.json(courses[0]);
});

const getCourseFeed = asyncHandler(async (req, res) => {
  const courseCode = req.params.code;
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Await query on announcement and assignment tables.
  const [courseEvents] = await pool.execute(`
      SELECT
        "announcement" AS type,
        NULL AS title,
        announcement.content,
        NULL AS due_at,
        announcement.created_at,
        announcement.updated_at,
        NULL AS turned_in_at,
        material.url AS material_url
      FROM announcement
        LEFT JOIN announcement_materials
        ON announcement.id = announcement_materials.announcement_id
        LEFT JOIN material
        ON announcement_materials.material_id = material.id
      WHERE announcement.course_id = ?
    UNION ALL
      SELECT
        "assignment" AS type,
        assignment.title,
        assignment.content,
        assignment.due_at,
        assignment.created_at,
        assignment.updated_at,
        assignment.turned_in_at,
        material.url AS material_url
      FROM assignment
        LEFT JOIN assignment_materials
        ON assignment.id = assignment_materials.assignment_id
        LEFT JOIN material
        ON assignment_materials.material_id = material.id
      WHERE assignment.user_id = ?
    ORDER BY created_at ASC
    LIMIT 20 OFFSET 0
  `, [courseCode, req.session.user.sub]); // TODO: This LIMIT operation can accidentally exclude materials from an event if it contains multiple materials.
  // If one result was not returned by database.
  if (courseEvents.length <= 0) {
    return res
      .status(404) // NOT FOUND.
      .send(`Kunde inte hitta några händelser i kursen med kod "${courseCode}"`);
  }
  const defraggedCourseEvents = [];
  // Go through all returned course events and defragment them by
  // consolidating all material urls into an array.
  courseEvents.forEach(event => {
    // Find any defragged course events that exactly match this event.
    const alreadyDefraggedEvent = defraggedCourseEvents.find(defraggedEvent => (
      defraggedEvent.type === event.type &&
      defraggedEvent.title === event.title &&
      defraggedEvent.content === event.content
    ));
    // If defraggedCourseEvents contains this event already.
    if (alreadyDefraggedEvent) {
      // Add the material_url from this event to the materials array of the defragged one.
      alreadyDefraggedEvent.material_urls.push(event.material_url);
    } else { // defraggedCourseEvents does not contain this event.
      // If this event has a material url.
      if (event.material_url) {
        // Move material_url into material_urls array.
        event.material_urls = [event.material_url];
        // Delete material_url property, it is no longer needed.
        delete event.material_url;
      }
      // Add modified event to defragged course events.
      defraggedCourseEvents.push(event);
    }
  });
  // Respond with defragmented course events.
  return res.json(defraggedCourseEvents);
});

module.exports.getCourses = getCourses;
module.exports.getCourseEvents = getCourseEvents;
module.exports.getCourse = getCourse;
module.exports.getCourseFeed = getCourseFeed;
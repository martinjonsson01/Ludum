const express = require("express");
const router = express.Router();

const sessionChecker = require("./SessionChecker");
const user = require("./User");
const getNews = require("./News");
const course = require("./Course");

/**
 * Unauthenticated routes.
 */

// PUT current session user.
router.put("/current-user", user.putCurrentUser);

/**
 * Authenticated routes.
 */

// GET current session user.
router.get("/current-user", sessionChecker, user.getCurrentUser);

// DELETE current user session.
router.delete("/current-user", sessionChecker, user.deleteCurrentUser);

// GET news from the database.
router.get("/news", sessionChecker, getNews);

// GET course events from the database.
router.get("/course-events", sessionChecker, course.getCourseEvents);

// GET courses for user from the database.
router.get("/courses", sessionChecker, course.getCourses);

// GET course data from the database.
router.get("/course/:code", sessionChecker, course.getCourse);

// GET course feed from the database.
router.get("/course/:code/feed", sessionChecker, course.getCourseFeed);

module.exports = router;
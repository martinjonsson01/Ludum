const express = require("express");
const router = express.Router();

const sessionChecker = require("./SessionChecker");
const user = require("./User");
const newsRouter = require("./news");
const coursesRouter = require("./courses");
const commentsRouter = require("./comments");

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

/**
 * Authenticated routers.
 */

// News router.
router.use("/news", sessionChecker, newsRouter);

// Courses router.
router.use("/courses", sessionChecker, coursesRouter);

// Comments router.
router.use("/comments", sessionChecker, commentsRouter);

module.exports = router;
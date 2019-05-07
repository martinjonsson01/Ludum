const express = require("express");
const router = express.Router();

const db = require("../db");
const asyncHandler = require("express-async-handler");

// POST a comment on an assignment to the database.
router.post("/assignment/:postId", asyncHandler(async (req, res) => await createComment(req, res, "assignment")));

// POST a comment on an announcement to the database.
router.post("/announcement/:postId", asyncHandler(async (req, res) => await createComment(req, res, "announcement")));

// GET comments on assignment from the database.
router.get("/assignment/:postId", asyncHandler(async (req, res) => await getComments(req, res, "assignment")));

// GET comments on announcement from the database.
router.get("/announcement/:postId", asyncHandler(async (req, res) => await getComments(req, res, "announcement")));

async function createComment(req, res, postType) {
  // If no message is provided in the body.
  if (!req.body.message) {
    return res
      .status(400) // BAD REQUEST.
      .send("Ett meddelande måste inkluderas.");
  }

  // Get database connection-pool-object.
  const pool = db.getPool();
  // Await query for inserting comment.
  const [comment] = await pool.execute(`
    INSERT INTO comment (body, user_id)
    VALUES (?, ?);
  `, [req.body.message, req.session.user.sub]);
  try {
    // Await query for inserting many-to-one relationship ids.
    await pool.execute(`
      INSERT INTO ${postType}_comments (${postType}_id, comment_id)
      VALUES (?, ?);
    `, [req.params.postId, comment.insertId]);
  } catch (error) {
    // An error occured when INSERTing into database.
    // It was most likely caused by an invalid id key.

    // DELETE previously inserted comment.
    await pool.execute(`
      DELETE FROM comment
      WHERE id=?
    `, [comment.insertId]);
    return res
      .status(404) // NOT FOUND.
      .send(`Kunde inte hitta post med ID "${req.params.postId}"`);
  }

  const currentDate = new Date().toString();
  const newComment = {
    body: req.body.message,
    created_at: currentDate,
    updated_at: currentDate,
    user_id: req.session.user.sub,
    user_name: req.session.user.name,
    avatar_url: req.session.user.picture
  };

  return res
    .status(201) // CREATED.
    .json(newComment);
}

async function getComments(req, res, postType) {
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Await query on comment tables.
  const [comments] = await pool.execute(`
    SELECT
      comment.body,
      comment.created_at,
      comment.updated_at,
      user.id AS user_id,
      CONCAT(user.first_name, ' ', user.last_name) AS user_name,
      user.avatar_url
    FROM comment
      JOIN ${postType}_comments
        ON comment.id = ${postType}_comments.comment_id
      JOIN user
        ON comment.user_id = user.id
    WHERE ${postType}_comments.${postType}_id = ?
  `, [req.params.postId]);
  // If one result was not returned by database.
  if (comments.length <= 0) {
    return res
      .status(204) // NO CONTENT.
      .send();
  }
  // Respond with comments.
  return res.json(comments);
}

module.exports = router;
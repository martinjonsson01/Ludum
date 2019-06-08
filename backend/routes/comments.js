const express = require("express");
const router = express.Router();

const db = require("../db");
const asyncHandler = require("express-async-handler");

// PUT a comment on an assignment to the database.
router.put("/assignment/:postId", asyncHandler(async (req, res) => await createComment(req, res, "assignment")));

// PUT a private comment on an assignment to the database.
router.put("/assignment/:postId/private", asyncHandler(async (req, res) => await createComment(req, res, "assignment", true)));

// PUT a comment on an announcement to the database.
router.put("/announcement/:postId", asyncHandler(async (req, res) => await createComment(req, res, "announcement")));

// POST an update to a comment to the database.
router.post("/:commentId", asyncHandler(async (req, res) => await updateComment(req, res)));

// DELETE a comment from the database.
router.delete("/:commentId", asyncHandler(async (req, res) => await deleteComment(req, res)));

// GET comments on assignment from the database.
router.get("/assignment/:postId", asyncHandler(async (req, res) => await getComments(req, res, "assignment_template")));

// GET comments on announcement from the database.
router.get("/announcement/:postId", asyncHandler(async (req, res) => await getComments(req, res, "announcement")));

// GET private comments on assignment from the database.
router.get("/assignment/:postId/private", asyncHandler(async (req, res) => await getComments(req, res, "assignment", true)));

async function createComment(req, res, postType, privateComment = false) {
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
    if (postType === "assignment") {
      const args = privateComment ?
        [req.params.postId, req.session.user.sub, comment.insertId]
        :
        [req.params.postId, comment.insertId];
      // Await query for inserting many-to-one relationship ids.
      await pool.execute(`
        INSERT INTO assignment${privateComment ? "_private" : "_template"}_comments 
        (assignment_template_id,${privateComment ? " assignment_user_id," : ""} comment_id)
        VALUES (?,${privateComment ? " ?," : ""} ?);
      `, args);
    } else {
      // Await query for inserting many-to-one relationship ids.
      await pool.execute(`
        INSERT INTO ${postType}${privateComment ? "_private" : ""}_comments 
        (${postType}_id, comment_id)
        VALUES (?, ?);
      `, [req.params.postId, comment.insertId]);
    }
  } catch (error) {
    // An error occured when INSERTing into database.
    // It was most likely caused by an invalid id key.
    console.log(error);
    // DELETE previously inserted comment.
    await pool.execute(`
      DELETE FROM comment
      WHERE id=?
    `, [comment.insertId]);
    return res
      .status(404) // NOT FOUND.
      .send(`Kunde inte hitta inlägg med ID "${req.params.postId}"`);
  }

  const currentDate = new Date().toString();
  const newComment = {
    id: comment.insertId,
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

async function updateComment(req, res) {
  // If no comment ID is provided in the parameters.
  if (!req.params.commentId) {
    return res
      .status(400) // BAD REQUEST.
      .send("Ett kommentar-ID måste inkluderas i URL.");
  }
  // If no message is provided in the body.
  if (!req.body.message) {
    return res
      .status(400) // BAD REQUEST.
      .send("En kommentar måste inkluderas i body.");
  }

  // Get database connection-pool-object.
  const pool = db.getPool();
  try {
    // Await query for UPDATE-ing comment.
    await pool.execute(`
      UPDATE comment
      SET body=?
      WHERE 
        id=?
        AND
        user_id=?
    `, [req.body.message, req.params.commentId, req.session.user.sub]);
  } catch (error) {
    // An error occured when UPDATE-ing from database.
    // It was most likely caused by an invalid id key.
    return res
      .status(404) // NOT FOUND.
      .send(`Kunde inte hitta kommentar med ID "${req.params.commentId} från användare med ID ${req.session.user.sub}"`);
  }

  return res
    .status(204) // NO CONTENT.
    .send();
}

async function deleteComment(req, res) {
  // If no comment ID is provided in the parameters.
  if (!req.params.commentId) {
    return res
      .status(400) // BAD REQUEST.
      .send("Ett kommentar-ID måste inkluderas i URL.");
  }

  // Get database connection-pool-object.
  const pool = db.getPool();
  try {
    // Await query for DELETE-ing comment.
    await pool.execute(`
      DELETE FROM comment
      WHERE 
        id=?
        AND
        user_id=?
    `, [req.params.commentId, req.session.user.sub]);
  } catch (error) {
    // An error occured when DELETE-ing from database.
    // It was most likely caused by an invalid id key.
    return res
      .status(404) // NOT FOUND.
      .send(`Kunde inte hitta kommentar med ID "${req.params.commentId} från användare med ID ${req.session.user.sub}"`);
  }

  return res
    .status(204) // NO CONTENT.
    .send();
}

async function getComments(req, res, postType, privateComments = false) {
  // Get database connection-pool-object.
  const pool = db.getPool();
  // The columns to select.
  var cols = `
    comment.id,
    comment.body,
    comment.created_at,
    comment.updated_at,
    user.id AS user_id,
    CONCAT(user.first_name, ' ', user.last_name) AS user_name,
    user.avatar_url
  `;
  // Construct a query depending on function parameters.
  var query;
  var queryParams;
  if (postType === "assignment" && privateComments) {
    query = `
      SELECT
        ${cols}
      FROM comment
        JOIN assignment_private_comments
          ON comment.id = assignment_private_comments.comment_id
        JOIN user
          ON comment.user_id = user.id
      WHERE assignment_private_comments.assignment_template_id = ? 
        AND assignment_private_comments.assignment_user_id = ?
      ORDER BY comment.created_at ASC
    `;
    queryParams = [req.params.postId, req.session.user.sub];
  } else {
    query = `
      SELECT
        ${cols}
      FROM comment
        JOIN ${postType}${privateComments ? "_private" : ""}_comments
          ON comment.id = ${postType}${privateComments ? "_private" : ""}_comments.comment_id
        JOIN user
          ON comment.user_id = user.id
      WHERE ${postType}${privateComments ? "_private" : ""}_comments.${postType}_id = ?
      ORDER BY comment.created_at ASC
    `;
    queryParams = [req.params.postId];
  }
  // Await query on comment tables.
  const [comments] = await pool.execute(query, queryParams);
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
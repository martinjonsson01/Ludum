const express = require("express");
const router = express.Router();

const db = require("../db");
const asyncHandler = require("express-async-handler");

// GET materials for an assignment from the database.
router.get("/:id/materials", asyncHandler(async (req, res) => await getMaterials(req, res)));

// PUT materials for an assignment into the database.
router.put("/:id/materials", asyncHandler(async (req, res) => await putMaterials(req, res)));

async function getMaterials(req, res) {
  //const courseCode = req.params.code;
  const assignmentId = req.params.id;
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Await query for assignment materials.
  const [materials] = await pool.execute(`
    SELECT
      material.id,
      material.url
    FROM assignment_materials
      JOIN material
        ON material.id = assignment_materials.material_id
    WHERE
      assignment_materials.assignment_template_id = ?
      AND
      assignment_materials.assignment_user_id = ?
  `, [assignmentId, req.session.user.sub]);

  return res
    .status(200) // OK.
    .json(materials);
}

async function putMaterials(req, res) {
  const materialUrls = req.body.materials;
  if (!materialUrls) {
    return res
      .status(400) // BAD REQUEST.
      .send("Material-URL måste inkluderas i body.");
  }

  const assignmentId = req.params.id;
  // Get database connection-pool-object.
  const pool = db.getPool();

  // Go through all material URLs and save in database.
  for (var i = 0; i < materialUrls.length; i++) {
    const url = materialUrls[i];

    // Add materials to database.
    const [material] = await pool.execute(`
      INSERT INTO material 
      (url) 
      VALUES (?);
    `, [url]);

    // Add materials to linking table.
    await pool.execute(`
      INSERT INTO assignment_materials 
      (assignment_template_id, assignment_user_id, material_id)
      VALUES (?, ?, ?);
    `, [assignmentId, req.session.user.sub, material.insertId]);
  }

  return res
    .status(201) // CREATED.
    .send();
}

module.exports = router;
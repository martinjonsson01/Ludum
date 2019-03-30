const express = require("express");
const db = require("../db");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// GET current session user.
router.get("/current-user", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.sendStatus(404);
  }
});

// POST current session user.
router.post("/current-user", (req, res) => {
  // TODO: Validate JWT before allowing user access.
  req.session.user = req.body;
  res.sendStatus(200);
});

// DELETE current user session.
router.delete("/current-user", (req, res) => {
  // TODO: Validate JWT before allowing user access.
  req.session.destroy(err => {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

// GET news from the database.
router.get("/news", asyncHandler(async (req, res) => {
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Which columns to SELECT.
  const columns = "news.title, news.body, news.created_at, news.updated_at, user.first_name, user.last_name, user.avatar_url";
  // Await query on news and user tables.
  const result = await pool.query(
    `SELECT ${columns} FROM news JOIN user ON news.user_id = user.id`
  );
  // Respond with list of news-data.
  res.json(result[0]);
}));

// GET course events from the database.
router.get("/course-events", (req, res) => {
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
});

// GET courses for user from the database.
router.get("/courses", asyncHandler(async (req, res) => {

  // TODO: Make working user sign-in and auth system before this can be finished.

  // Get database connection-pool-object.
  const pool = db.getPool();
  // Which columns to SELECT.
  const columns = "news.title, news.body, news.created_at, news.updated_at, user.first_name, user.last_name, user.avatar_url";
  // Await query on news and user tables.
  const result = await pool.query(
    `SELECT ${columns} FROM news JOIN user ON news.user_id = user.id`
  );
  // Respond with list of news-data.
  res.json(result[0]);
}));

// GET course data from the database.
router.get("/course/:code", (req, res) => {
  setTimeout(() =>
    res.json([
      {
        code: req.params.code,
      }
    ]), 1000);
});

// GET all available data in the database.
/*router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// POST updates to data in the database.
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// DELETE data from the database.
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// POST new data to the database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});*/

module.exports = router;
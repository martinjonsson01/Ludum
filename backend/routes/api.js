const express = require("express");
const db = require("../db");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "425892769172-0jb5mo5gm07avnjraabf75pkula2uv65.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// Middleware function used to only allow logged-in users through.
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies["connect.sid"]) {
    // Allow through.
    next();
  } else {
    return res
      .status(401) // UNAUTHORIZED.
      .send("Var snäll och logga in först.");
  }
};

// GET current session user.
router.get("/current-user", sessionChecker, (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.sendStatus(404); // NOT FOUND.
  }
});

// PUT current session user.
router.put("/current-user", asyncHandler(async (req, res) => {
  /**
   * Validate JWT before allowing user access.
   */
  // Get the idToken provided by the client.
  const jwtToken = req.body.idToken;
  if (!jwtToken) return res.sendStatus(401); // UNAUTHORIZED.
  const ticket = await client.verifyIdToken({
    idToken: jwtToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  // Get the hosted domain of the token.
  const tokenHostedDomain = payload["hd"];
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Get the hosted domain of the school from the database.
  const [hosted_domains] = await pool.query("SELECT hosted_domain FROM school");
  const schoolHostedDomain = hosted_domains[0].hosted_domain;
  // Check if hosted domain of token matches the hosted domain of the school.
  if (tokenHostedDomain !== schoolHostedDomain) {
    return res
      .status(401) // UNAUTHORIZED.
      .send(
        "Google-kontot är inte en del av skolans G-Suite. " +
        "Var snäll och använd ett konto som är med i skolans G-Suite."
      );
  }

  /**
   * Add user to database if not already there.
   */
  // Get the subject of the token (the user ID).
  const userId = payload["sub"];
  // Check if a user with id userId exists in database.
  const [users] = await pool.execute(
    "SELECT id FROM user WHERE id = ?",
    [userId]
  );
  if (users.length === 0) {
    // TODO: Store user in database.
    /*await pool.execute(
      "INSERT INTO user (id, first_name, last_name, avatar_url, email, date_of_birth) " +
      "VALUES (?, ?, ?, ?, ?, ?)",
      []
    );*/
  }

  req.session.user = payload;

  return res
    .status(200) // OK.
    .send(payload);
}));

// DELETE current user session.
router.delete("/current-user", sessionChecker, (req, res) => {
  // TODO: Validate JWT before allowing user access.
  req.session.destroy(err => {
    if (err) return res.sendStatus(500); // INTERNAL SERVER ERROR.
    // Clear session cookie.
    res.clearCookie("connect.sid");
    return res.sendStatus(200); // OK.
  });
});

// GET news from the database.
router.get("/news", sessionChecker, asyncHandler(async (req, res) => {
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Which columns to SELECT.
  const columns = "news.title, news.body, news.created_at, news.updated_at, user.first_name, user.last_name, user.avatar_url";
  // Await query on news and user tables.
  const result = await pool.query(
    `SELECT ${columns} FROM news JOIN user ON news.user_id = user.id`
  );
  // Respond with list of news-data.
  return res.json(result[0]);
}));

// GET course events from the database.
router.get("/course-events", sessionChecker, (req, res) => {
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
router.get("/courses", sessionChecker, asyncHandler(async (req, res) => {
  // Can't fetch courses if a user session isn't established. TODO: Move this into a seperate auth middleware.
  if (!req.session.user) return res.sendStatus(403); // FORBIDDEN.
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
router.get("/course/:code", sessionChecker, (req, res) => {
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
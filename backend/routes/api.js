const express = require('express');
const db = require("../db");
const util = require('util');
const router = express.Router();

// GET news from the database.
router.get("/news", asyncMiddleware(async (req, res, next) => {
  const query = util.promisify(dbConnection.query).bind(dbConnection);
  const columns = "news.title, news.body, news.created_at, news.updated_at, user.first_name, user.last_name, user.avatar_url";
  const result = await query(
    `SELECT ${columns} FROM news JOIN user ON news.user_id = user.id`
  );
  res.send(result);
  // TODO: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
  // TODO: https://www.npmjs.com/package/mysql2
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

// GET general courses for user from the database.
router.get("/general-courses", (req, res) => {
  setTimeout(() =>
    res.json([
      {
        code: "IDRIDR01",
        name: "Idrott & hälsa 1",
        teachers: [
          {
            name: "Johan Rosenströmer",
            image: "https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg"
          },
        ],
        image: "https://lh4.googleusercontent.com/-Ze5AXIltkd0/VN0otDrb-6I/AAAAAAAAAXI/QrrpSFrBY3k/w984-h209-no/29_robots.jpg",
      },
      {
        code: "IDRIDR01",
        name: "Idrott & hälsa 1",
        teachers: [
          {
            name: "Johan Rosenströmer",
            image: "https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg"
          },
        ],
        image: "https://lh4.googleusercontent.com/-Ze5AXIltkd0/VN0otDrb-6I/AAAAAAAAAXI/QrrpSFrBY3k/w984-h209-no/29_robots.jpg",
      },
    ]), 1000);
});

// GET specific courses for user from the database.
router.get("/specific-courses", (req, res) => {
  setTimeout(() =>
    res.json([
      {
        code: "IDRIDR01",
        name: "Idrott & hälsa 1",
        teachers: [
          {
            name: "Johan Rosenströmer",
            image: "https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg"
          },
        ],
        image: "https://lh4.googleusercontent.com/-Ze5AXIltkd0/VN0otDrb-6I/AAAAAAAAAXI/QrrpSFrBY3k/w984-h209-no/29_robots.jpg",
      },
      {
        code: "IDRIDR01",
        name: "Idrott & hälsa 1",
        teachers: [
          {
            name: "Johan Rosenströmer",
            image: "https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg"
          },
        ],
        image: "https://lh4.googleusercontent.com/-Ze5AXIltkd0/VN0otDrb-6I/AAAAAAAAAXI/QrrpSFrBY3k/w984-h209-no/29_robots.jpg",
      },
    ]), 1000);
});

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
router.get("/getData", (req, res) => {
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
});

module.exports = router;
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const compression = require("compression");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const db = require("./db");

exports.start = async () => {
  const API_PORT = process.env.PORT || 3001;
  const app = express();

  const sessionStoreOptions = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password", // TODO: Change password to ENV-variable.
    database: "ludum_db",
    clearExpired: true,
    checkExpirationInterval: 43200,
    connectionLimit: 10,
    expiration: 86400,
  };

  const apiRouter = require("./routes/api");

  try {
    // Initialize database connection pool.
    await db.init();
  } catch (error) {
    console.error("Failed to initialize database:");
    console.error(error);
    process.exit(1);
  }

  // Logging and bodyParser that parses the request body to be a readable json format.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger("dev"));

  const dbPool = db.getPool();
  // Create session store using database connection pool.
  const sessionStore = new MySQLStore(sessionStoreOptions, dbPool);
  const sessionOptions = {
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 86400,
      sameSite: "strict",
    },
    secret: "xx._ludum_super_hemlig_hemlighet_.xx", // TODO: Change secret to ENV-variable.
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  };

  const env = process.env.NODE_ENV || "dev";
  if (env === "dev") {
    // Only allow Cross-Origin requests when in development mode.
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    // Only format JSON-responses when in development mode.
    app.set("json spaces", 2);
  }
  if (env === "production") {
    // Only serve secure cookies when in production mode.
    sessionOptions.cookie.secure = true;
  }

  // Add session middleware.
  app.use(session(sessionOptions));

  // GZip-compress assets before serving.
  app.use(compression());

  // Route requests going to /api through the api router.
  app.use("/api", apiRouter);

  // Serve static assets from build folder.
  app.use(express.static("../client/build"));

  // Link all requests not going to /api to the React client.
  app.get("/*", function (req, res) {
    res.sendFile("client/build/index.html", { root: "../" });
  });

  // Start backend server.
  app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
};

if (!module.parent) {
  exports.start().catch(error => {
    console.error("Error starting server:");
    console.error(error);
    process.exit(1);
  });
}
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const compression = require('compression')
const cors = require("cors");

const API_PORT = 3001;
const app = express();

const apiRouter = require("./routes/api");

// The MongoDB database.
const dbRoute = "mongodb://localhost:27017/ludum";

// Connects to MongoDB.
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("Connected to the database."));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Logging and bodyParser that parses the request body to be a readable json format.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

const env = process.env.NODE_ENV || 'dev';
// Only allow Cross-Origin requests when in development mode.
if (env === "dev") {
    app.use(cors());
}

// GZip-compress assets before serving.
app.use(compression());

// Route requests going to /api through the api router.
app.use("/api", apiRouter);

// Serve static assets from build folder.
app.use(express.static("../client/build"));

// Link all requests not going to /api to the React client.
app.get('/*', function (req, res) {
    res.sendFile("client/build/index.html", { root: "../" });
});

// Start backend server.
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
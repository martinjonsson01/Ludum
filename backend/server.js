const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

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

// Route requests going to /api through the api router.
app.use("/api", apiRouter);

// Start backend server.
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
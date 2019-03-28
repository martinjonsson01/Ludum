const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const compression = require('compression')
const cors = require("cors");
const db = require("./db");

exports.start = async () => {
    const API_PORT = process.env.PORT || 3001;
    const app = express();

    const apiRouter = require("./routes/api");

    try {
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
    app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
};

if (!module.parent) {
    exports.start().catch(error => {
        console.error("Error starting server:");
        console.error(error);
        process.exit(1);
    });
}
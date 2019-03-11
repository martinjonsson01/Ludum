const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database data structure.
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
const mongoose = require("mongoose");

const igSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, " must have a id"],
  },
  start_time: {
    type: String,
    required: [true, "Please provide start_time"],
  },
  access_key: {
    type: String,
    required: [true, "Please provide access_key"],
  },
});

module.exports = mongoose.model("igModel", igSchema);

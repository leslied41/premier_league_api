const mongoose = require("mongoose");

const igSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Team must have a id"],
  },
  start_time: {
    type: String,
    required: [true, "Please provide start_time"],
  },
});

module.exports = mongoose.model("igModel", igSchema);

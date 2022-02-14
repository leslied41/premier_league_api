const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Team must have a name"],
  },
  name: {
    type: String,
    required: [true, "Team must have a name"],
  },
  manager: {
    type: String,
    required: [true, "Team must have a manager"],
  },
  teamValue: {
    type: String,
    required: [true, "Team must have a team value"],
  },
  founded: {
    type: String,
    required: [true, "Team must have a founded year"],
  },
  venue: {
    type: String,
    required: [true, "Team must have a venue"],
  },
});

module.exports = mongoose.model("teamModel", teamSchema);

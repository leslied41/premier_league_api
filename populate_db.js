require("dotenv").config();

const connectDB = require("./db/connect");
const teamModel = require("./models/team");
const json_teams = require("./teams.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("success");
    await teamModel.deleteMany();
    await teamModel.create(json_teams);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

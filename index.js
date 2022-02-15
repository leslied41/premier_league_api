const express = require("express");
const dotenv = require("dotenv");
const teams_router = require("./routes/teams_routes.js");
const user_router = require("./routes/user_routes");
dotenv.config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
  console.log("test");
  res.send("hello it is my first time!");
});
//user route
app.use(user_router);
//teams route
app.use("/api", teams_router);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`sever running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

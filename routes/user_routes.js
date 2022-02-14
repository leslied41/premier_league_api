const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { createToken, verifyToken } = require("../authrntication/jwt");
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.status(401).json({ error: "This email has been registered" });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      const newUser = new userModel({
        email: req.body.email,
        password: hash,
      });
      newUser
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status(400).json({ error: "something went wrong" });
        });
    });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please provide email and password" });
    return;
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).json({ error: "User does not exist" });
    return;
  }
  const db_password = user.password;
  const isMacth = await bcrypt.compare(password, db_password);
  if (!isMacth) {
    res.status(401).json({ error: "Invalid Credentials" });
  } else {
    const access_token = createToken(user);
    res.cookie("access-token", access_token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    res.json("logged in");
  }
});

module.exports = router;

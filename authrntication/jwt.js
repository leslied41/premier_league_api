const { sign, verify } = require("jsonwebtoken");
const userModel = require("../models/user");

const createToken = (user) => {
  const access_token = sign(
    { user_info: { email: user.email, role: user.role } },
    process.env.JWT_SECRET,
    { expiresIn: "365d" }
  );
  return access_token;
};

const verifyToken = (permission) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
      return res.status(400).json({ error: "User not authenticated" });
    }
    // const access_token = req.cookies["access-token"];
    // if (!access_token) {
    //   return res
    //     .status(400)
    //     .json({ error: "User not authenticated", cookie: req.cookies });
    // }
    try {
      const valid_token = verify(token, process.env.JWT_SECRET);
      if (valid_token) {
        //console.log(req.cookies);
        //req.authenticated = true;
        //console.log(valid_token.user_info.role);
        if (permission.includes(valid_token.user_info.role)) {
          return next();
        } else {
          return res.status(401).json({ role: valid_token.user_info.role });
        }
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
};

module.exports = { createToken, verifyToken };

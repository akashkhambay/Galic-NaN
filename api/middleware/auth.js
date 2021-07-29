require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, data) => {
      if (err) {
        res.status(403).json({ err: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ err: "Missing token" });
  }
}
module.exports = { verifyToken };

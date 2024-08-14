const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Auth failed",
        });
      } else {
        req.body.userId = decoded._id;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " UnValid token  pass",
    });
  }
};
module.exports = { authMiddleware };

const express = require("express");
const router = express.Router();
const { userinfo } = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
router.post("/getDetails", authMiddleware, userinfo);

module.exports = router;

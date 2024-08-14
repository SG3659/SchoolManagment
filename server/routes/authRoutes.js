const express = require("express");
const router = express.Router();
const ApiRateLimit = require("../middleware/limit");
const { register, login } = require("../controller/authController");

router.post("/register", register);
router.post("/login", ApiRateLimit, login);

module.exports = router;


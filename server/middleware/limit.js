const rateLimit = require("express-rate-limit");
const ApiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again after some time",
});
module.exports = ApiRateLimit;

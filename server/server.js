const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const port = 5000 || process.env.PORT;
const cookieParser = require("cookie-parser");
require("./config/dbConnect").connect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

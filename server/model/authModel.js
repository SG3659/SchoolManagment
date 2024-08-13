const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
require("dotenv").config();
const userSchema = Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      require: true,
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [128, "Password must be less than 128 characters long"],
      validate: {
        validator: function (value) {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
          return regex.test(value);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
      },
    },
    isPrinciple: {
      type: Boolean,
      default: false,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);
//hashing the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(16);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (error) {
      return next(error);
    }
  }
});
// comparePassword
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
// genrateToken
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PASSWORD, {
    expiresIn: "1d",
  });
  return token;
};
// count increment
userSchema.methods.logInIncrement = function () {
  this.loginCount += 1;
  return this.save();
};

// verify token
userSchema.static.verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    return this.findOne({ _id: decoded._id });
  } catch (error) {
    throw new Error(`Error verifying token ${error.message}`);
  }
};

module.exports = model("User", userSchema);

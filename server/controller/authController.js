const User = require("../model/authModel");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(401).json({
        success: false,
        message: "Email Exits",
      });
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    return res.status(200).json({
      success: true,
      message: "User Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be created",
    });
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid User",
      });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const token = user.generateToken();
    await user.logInIncrement();
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Success",
        data: token,
        ...rest,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Can't Login",
    });
  }
};
module.exports = { register, login };

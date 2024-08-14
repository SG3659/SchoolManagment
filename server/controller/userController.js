const User = require("../model/authModel");

exports.userinfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res.send({
        success: false,
        message: "user does not exist",
      });
    } else {
      user.password = undefined;
      res.send({
        success: true,
        data: user, // all login user data pass accept password
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

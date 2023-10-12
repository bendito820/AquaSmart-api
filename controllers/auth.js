const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @desc      Log user in
// @route     POST  api/v1/auth
// @access    Public
exports.loginUser = async (req, res, next) => {
  let { email, password } = req.body;

  email = email.toLowerCase();

  try {
    const user = await User.findOne({ email });
    // Send response to the client
    console.log(user);
    // Checks if the password maches the user

    if (!user || user.password !== password) {
      return res.status(400).send({ error: "Incorrect Email or Password." });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email },
      "jwtPrivateKey"
    );

    res.send(token);
    // console.log("User Token: ", token);
  } catch (err) {
    console.error("Incorrect Email or Password", err);
  }
};

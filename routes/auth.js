const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const newPassword = req.body.password;
    const newUsername = req.body.username;
    const newEmail = req.body.email;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(newPassword, salt);

    const newUser = new UserModel({
      username: newUsername,
      email: newEmail,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(400).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(404).json({
        message: "Wrong Credentials!",
      });
    }

    const validate = await bcrypt.compareSync(req.body.password, user.password);

    if (!validate) {
      res.status(401).json({
        message: "Wrong Credentials!",
      });
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({
      error: "Login failed: " + error.message,
    });
  }
});

module.exports = router;

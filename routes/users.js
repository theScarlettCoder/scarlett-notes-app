const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const Notes = require("../models/noteModel");

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(404).json({ message: "User not found", error: error.message });
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  console.log(username);

  if (req.body.userId === id) {
    let emptyFields = [];

    if (!username) {
      emptyFields.push("username");
    }
    if (!email) {
      emptyFields.push("email");
    }
    if (!password) {
      emptyFields.push("password");
    }

    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: "Please fill in all fields",
        emptyFields,
      });
    }

    if (req.body.password) {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(20);
      password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({
        message: "Update user failed" + error.message,
        error: error.message,
      });
    }
  } else {
    res.status(401).json({
      message:
        "Unauthorized edit, You can edit only your account" + error.message,
      error: error.message,
    });
  }
});

// DELETE USER
router.delete("/", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);

      try {
        await Notes.deleteMany({ username: user.username });
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
          message: user.username + " has been deleted",
        });
      } catch (error) {
        res.status(404).json({
          message: user.username + "not found",
          error: error.message,
        });
      }
    } catch (error) {
      res.status({
        message: "Unauthorized delete",
        error: error.message,
      });
    }
  }
});

module.exports = router;

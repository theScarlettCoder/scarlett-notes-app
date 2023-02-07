const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    ImageModel.find().then((data) => {
      res.status(200).json({ data });
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get image",
      error: error.message,
    });
  }
});

router.post("/upload", async (req, res) => {
  const body = req.body;
  try {
    const newImage = await ImageModel.create(body);
    newImage.save();
    res.status(200).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
});

module.exports = router;

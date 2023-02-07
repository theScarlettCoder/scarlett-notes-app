const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    myFile: {
      type: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ImageModel", postSchema);

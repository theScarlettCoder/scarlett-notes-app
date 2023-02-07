const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const notesRoute = require("./routes/notes");
const imageRoute = require("./routes/images");

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB connected Successfully"))
  .catch((error) => {
    console.log(error.message);
  });

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/notes", notesRoute);

app.use("/api/images", imageRoute);

app.use("/", () => {
  console.log("Hello there, This is Notes api on " + PORT);
});

app.listen(PORT, () => {
  console.log("Notes API is listening @localhost:" + PORT);
});

module.exports = app;

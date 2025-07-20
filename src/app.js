const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

app.use(express.json());
app.post("/signup", async (req, res) => {
  const userObj = req.body;
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error Creating user");
  }
})
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
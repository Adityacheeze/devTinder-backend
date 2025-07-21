const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignUp } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) res.status(404).send("No user found with this email");
    else res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) res.status(404).send("No users found");
    else res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_FIELDS = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "photoURL",
      "about",
      "skills",
    ];
    const ALLOWED_UPDATE = Object.keys(data).every((key) =>
      ALLOWED_FIELDS.includes(key)
    );
    if (!ALLOWED_UPDATE) {
      throw new Error("Invalid fields for update");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
  } catch (err) {
    res.status(400).send("Invalid update request: " + err.message);
  }
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    // validating req body
    validateSignUp(req);
    // encrypt password
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    });
    await user.save();

    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error Creating user" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    } else {
      //generate JWT token
      const token = jwt.sign({ _id: user._id }, "DEV@TINDER_SECRET6278");

      //add token to cookies
      res.cookie("token", token);

      res.send("Login successful");
    }
  } catch (error) {
    res.status(500).send("Error Logging in: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Login Again");
    }
    // validate token
    const decodedMessage = jwt.verify(token, "DEV@TINDER_SECRET6278");
    const { _id } = decodedMessage;

    // find user by id
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong: " + err.message);
  }
});

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

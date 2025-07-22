const express = require("express");
const User = require("../models/user");
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email not found");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    } else {
      //generate JWT token
      const token = await user.getJWT();

      //add token to cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      });

      res.send("Login successfull");
    }
  } catch (error) {
    res.status(500).send("Error Logging in: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try{
    res.cookie("token", null, {
      expires : new Date(Date.now())
    })
    res.send("Logout Sucessfull");
  } catch (error) {
    res.status(500).send("Error Logging out: " + error.message);
  }
})

module.exports = authRouter;
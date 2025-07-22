const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const { validateEditProfile, validatePassword } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }

    const logedInUser = req.user;
    Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]));

    await logedInUser.save();

    res.json({
      message: `${logedInUser.firstName}, your profile was updated sucessfully`,
      data: logedInUser,
    });
  } catch (err) {
    res.status(400).send("something went wrong: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const { password } = req.body;
  try {
    if(!validatePassword(password)){
      throw new Error("Enter Strong Password");
    }
    const user = req.user;
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    await user.save();
    res.send("Password changed successfully");
  } catch (error) {
    res.status(400).send("Try Again");
  }

  });
module.exports = profileRouter;
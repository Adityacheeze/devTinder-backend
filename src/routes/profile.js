const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const { validateEditProfile } = require("../utils/validation");
const profileRouter = express.Router();

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
module.exports = profileRouter;
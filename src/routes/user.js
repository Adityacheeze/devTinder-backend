const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoURL");
    //.populate("fromUserId", ["firstName", "lastName", "photoURL"]);    
    res.json({
      message: "Data Fetched Successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;

const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.userId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      const isStatusValid = allowedStatus.includes(status);
      if (!isStatusValid) {
        return res.status(400).json({ message: "Invalid Status" });
      }
      const existingRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Already Exists" });
      }
      const toUserIdValid = await User.findById(toUserId);
      if (!toUserIdValid) {
        return res.status(404).json({ message: "User Not Found" });
      }
      // handled by schema level pre method

      // if(fromUserId == toUserId) {
      //   return res.status(400).json({message: "invalid request, cannot send connection request to yourself"});
      // }
      const connectionRequest = new ConnectionRequestModel({
        toUserId,
        fromUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: `${
          status == "interested"
            ? ` ${req.user.firstName} Sent a Connection Request to ${toUserIdValid.firstName}`
            : ` ${req.user.firstName} Ignored ${toUserIdValid.firstName}`
        }`,
        data,
      });
    } catch (err) {
      res.status(500).send("Error : " + err.message);
    }
  }
);

module.exports = requestRouter;

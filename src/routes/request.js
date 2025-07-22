const express =  require("express");
const { userAuth } = require("../middlewares/Auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sent a Connection Request");
});
 
module.exports = requestRouter;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //read token from cookies
  try{
    const {token} = req.cookies;
    if(!token) {
      throw new Error("Login Again");
    }
    // validate the token
    const decodedObj = jwt.verify(token, "DEV@TINDER_SECRET6278");
    const { _id } = decodedObj;
    // find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user; // attach user to request object
    // proceed to the next middleware or route handler
    next();
  } catch(err) {
    res.status(401).send("Error: " + err.message);
  }

};

module.exports = {
  userAuth,
};

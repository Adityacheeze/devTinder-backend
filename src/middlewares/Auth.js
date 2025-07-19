const adminAuth = (req, res, next) => {
  console.log("admin authentication checking");
  const token = "xyz";
  const adminAuth = token === "xyz";
  if (!adminAuth) {
    res.status(401).send("Unauthorized access");
  } else {
    console.log("admin authenticated");
    next(); // call the next middleware or route handler
  }
};
const userAuth = (req, res, next) => {
  console.log("user authentication checking");
  const token = "xyz";
  const userAuth = token === "xyz";
  if (!userAuth) {
    res.status(401).send("Unauthorized access");
  } else {
    console.log("user authenticated");
    next(); // call the next middleware or route handler
  }
};

module.exports = {
  adminAuth,
  userAuth,
};

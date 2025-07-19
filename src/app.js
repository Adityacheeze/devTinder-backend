const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "Aditya", lastname: "Mohan Gupta", age: 20 });
});

app.post("/user", (req, res) => {
  // perform db operation to save user
  res.send("data saved to database");
});

app.delete("/user", (req, res) => {
  // perform db operation to delete user
  res.send("user deleted");
});

//matches all api calls to test (Multiple route handler)
app.use(
  "/test",
  (req, res, next) => {
    console.log("Test endpoint hit");
    // res.send("Test, hello!");
    next(); // call the next handler
  },
  (req, res, next) => {
    console.log("2nd Test endpoint hit");
    // res.send("Test 2, hello!");
    next();
  },
  (req, res, next) => {
    console.log("3rd Test endpoint hit");
    res.send("Test 3, hello!");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

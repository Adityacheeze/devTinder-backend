const express = require("express");
const {userAuth, adminAuth} = require("./middlewares/Auth");
const app = express();

// autentication using middleware
app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All Data");
})

app.delete("/admin/deleteUser", (req, res, next) => {
  res.send("User deleted");
})

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
    next(); // call the middleware chain
  },
  (req, res, next) => {
    console.log("2nd Test endpoint hit");
    // res.send("Test 2, hello!");
    next(); // call the next middleware
  },
  (req, res, next) => {
    console.log("3rd Test endpoint hit");
    res.send("Test 3, hello!"); // final response handler
  }
);

// error handling 
app.get("/getDummyError", (req, res) => {
  throw new Error("Dummy error occurred");
  res.send("code");
});

app.use("/", (err, req, res, next) => {
  res.status(500).send("An error occurred");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const express = require('express');

const app = express();

app.get("/user", (req, res) => {
  res.send({firstname: "Aditya", lastname: "Mohan Gupta", age: 20});
});

app.post("/user", (req, res) => {
  // perform db operation to save user
  res.send("data saved to database");
});

app.delete("/user", (req, res) => {
  // perform db operation to delete user
  res.send("user deleted");
});

//matches all api calls to test
app.use("/test", (req, res) => {
  res.send('Test, hello!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
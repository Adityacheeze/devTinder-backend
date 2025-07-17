const express = require('express');

const app = express();

app.get("/test", (req, res) => {
  res.send('Test, hello!');
});

app.get("/hello", (req, res) => {
  res.send('Hello, Hello, Hello!');
});

app.get("/", (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
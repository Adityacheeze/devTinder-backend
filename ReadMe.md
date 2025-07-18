# Node 3
  - created a repository
  - initialized the repo
  - node_modules vs package.json vs package-lock.json
  - install and create an express server
  - listen on port 3000
  - write req handlers /test, / user
  - intalled nodemon and update scripts inside package.json
  - dependencies 
  <br>
### Version Names 
  `4.3.5 => major no | minor no | patch no`
  - `-g` => install in global scope <br>
  - `^`  => `Caret` : 	Patch updates allowed <br>
  - `~`  => `Tilde`  :  Minor + patch updates allowed <br>

### Dependencies ( package.json vs package-lock.json )
  - `package.json` : Describes the project dependencies and scripts.
  - `package-lock.json` : Locks exact dependency versions for consistency across all environments.

### Creating and Listening a Port 
  ```
  const express = require('express');
  
  const app = express();

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  ```
### REST API
  - GET : Retrieve data from server
  - POST : Add new data to server 
  - PUT : Update whole existing data on server
  - PATCH : Update pertially existing data on server
  - DELETE : Delete data from server
  ```
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
  
  ```
### Order of Writing API calls matter : <br>
  if we write "/" first then it will map all the API calls to itself and the /user API call will not be executed
  
  ```
  app.use("/user", (req, res) => {
    res.send("Hello User");
  });

  app.use("/", (req, res) => {
    res.send("Hello World");
  });
  ```
# Node 4
  - seting up routes
  - order of routes matter
  - installing and seting up postman
  - use of ?, +, (), * in routes
  - use of regex in routes /a/, /.fly$/
  - reading query params
  - reading dynamic routes

### Routing Expression
  - `*` => any string. eg => `/a*c`
  - `+` => repeat the prev char or string if `()` are used. eg => `/ab+c`
  - `?` => optional char. eg => `ab?c`
  - `()` => group multiple char to apply a common operation. eg => `a(ab)+c`
  - `/a/` => write any regex. eg => `/.fly$/`
  - `$` => end of string in regex.

### Dynamic Routing 
  1. Using req.query : <br>
  Path => `http://localhost:3000/user?userID=777&password=test` <br>
  Method => `req.query`
  ```
  app.get("/user", (req, res) => {
    console.log(req.query)
  });
  ```
  2. Using req.params : <br>
  Path => `http://localhost:3000/user/:userID/:password` <br>
  Method => `req.params`
  ```
   app.get("/user/:userID/:password", (req, res) => {
    console.log(req.params)
  });
  ```
     

   
    

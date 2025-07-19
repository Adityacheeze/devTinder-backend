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
# Node 5
### Multiple Route Handlers <br>
- We can send multiple route handlers in a single route, but we have to make sure to send the response back only one time, because if we will not send the response back then it will be stuck in an infinite loop and if we will send multiple responses then it will give an error as after the first response is sent the connection is broken.
     
```
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

```

### MiddleWare Authentication 
  - We can use Middlewares to reduce code redundency and perform all the authentication checks in the `/admin` middleware.
  - if the admin is verified then only it will move to the next route handler
  - else it will show error.

  ```
  // autentication using middleware
  app.use("/admin", (req, res, next) => {
    console.log("admin authentication checking");
    const token = "xyz";
    const adminAuth = token === "xyz";
    if(!adminAuth){
      res.status(401).send("Unauthorized access");
    }
    else {
      console.log("admin authenticated");
      next(); // call the next middleware or route handler
    }
  })

  app.get("/admin/getAllData", (req, res, next) => {
    res.send("All Data");
  })

  app.delete("/admin/deleteUser", (req, res, next) => {
    res.send("User deleted");
  })
  ```

### Wildcard Error Handling 
  - If even after applying try catch some unexpected error occurs in our application.
  - This error can be detected by *"wildcard"* **Error Handler MiddleWare**.
  ```
    // error handling 
    app.get("/getDummyError", (req, res) => {
      throw new Error("Dummy error occurred");
      res.send("code");
    });

    app.use((err, req, res, next) => {
      res.status(500).send("An error occurred");
    });
  ```


   
    

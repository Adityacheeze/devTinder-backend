# Node 3
  - Created a repository
  - Initialized the repo
  - node_modules vs package.json vs package-lock.json
  - Install and create an express server
  - Listen on port 3000
  - Write req handlers /test, / user
  - Intalled nodemon and update scripts inside package.json
  - Dependencies 
### Version Names 
  `4.3.5` => `major no | minor no | patch no` <br>
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
  - Seting up routes
  - Order of routes matter
  - Installing and seting up postman
  - Use of ?, +, (), * in routes
  - Use of regex in routes /a/, /.fly$/
  - Reading query params
  - Reading dynamic routes

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
- Multiple Route Handlers
- next() function and error associated with next
- What is MiddleWare ?
- Difference between app.use() vs app.all() ?
- Authentication using middlewares.
- Error Handling using `app.use("/",(err, req, res, next) => {});`

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

    app.use("/", (err, req, res, next) => {
      res.status(500).send("An error occurred");
    });
  ```

# Node 6
  - Install MongoDB and create a free cluster
  - Install Mongoose
  - Connect to database and then start your application
  - Creating UserSchema & UserModel
  - Created POST /signup API to add data to database

### Connecting to Database via Mongoose
  ```
  const mongoose = require("mongoose");
  const connectDB = async () => {
    await mongoose.connect("databseconnectionstring");
  };

  module.exports = connectDB;
  ```
  - In the app.js remember to connect the database first before starting the server

### Creating User Schema & User Model
  ```
  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    }, ....
  });

  const User = mongoose.model("User", userSchema);
  module.exports = User;

  ```

### Creating Post API to send dummy data to DataBase
  - The `app.use(express.json());` middleware is used to covert the JSON object from API to javascript object which can be easily ready by express.

  ```
    app.use(express.json()); // JSON to JS Object Conversion

    app.post("/signup", async (req, res) => {
      const userObj = req.body; // assume data in API body

      // Creating an Instance of the User Model
      const user = new User(userObj);

      try {
        await user.save();
        res.send("User created successfully");
      } catch (err) {
        res.status(500).send("Error Creating user");
      }
    })
  ```
   
# Node 7
  - JS object vs JSON object
  - Add express.json middleware
  - Make /signup API dynamic to recieve data from end user and store it in DB
  - Make GET /user API to get a user based on email ID from DB
  - Make GET /feed API to get all users in the DB
  - Make DELETE /user API to delete a user from DB
  - Make PATCH /user API to update a user in DB

# Node 8
  - Added Schema Level Validations
  - Added API Level Validations
  - Insatall Validator Library
  - Used Validator for validation of password, email, photoURL.

# Node 9
  - Add validation to signup using helper validation function
  - Install bcrypt Library
  - Encrypt passwords using bcrypt.hash()
  - Store encrypted passwords in database
  - Created POST login API
  - Comapared password with hash in DB using bcrypt.compare()

# Node 10
  - Add cookie-parser library
  - Create GET /profile API
  - Send dummy cookie and check it 
  - Add jsonwebtoken library
  - In /login API after validation create a jwt token and store it in the cookies
  - Read the cookie in /profile API and find out who is logged in.
  - Send data of logged in user
  - Create the UserAuth Middleware to authenticate the cookies 
  - Add the Middleware to /profile API and sendConnectionRequest API
  - Set the expiry of cookie and JWT token
  - Create userSchema method to get JWT token
  - Create userSchema method to validate password

### Schema Methods 
  - While creating schema methods always use `normal functions` instead of `arrow functions` else it will not work
  ```
    userSchema.methods.getJWT = async function () {
      const user = this;
      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER_SECRET6278", {
            expiresIn: "1d",
          });
      return token;
    };
  ```

# Node 11 
  - Created API_List
  - Created authRouter, profileRouter, requestRouter
  - Added Routing for API's
  - Imported Routers to app.js
  - Created POST /logout API
  - Create ValidateEditProfile method in validations to validate the edit profile request
  - Created PATCH /profile/edit API
  - Created PATCH /profile/password API 

### Routing of API's
  - Creating Router :-
  ```
    const express =  require("express");
    const { userAuth } = require("../middlewares/Auth");

    const requestRouter = express.Router();

    requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {...});
    
    module.exports = requestRouter;
  ```
  - Import Router by :- `app.use("/", requestRouter);`

# Node 12
  - Added POST /request/send/:status/:userId API to send a connection request and ignore a request.
  - Adding Schema level pre() method
  - Adding enums in gender in user schema
  - Adding enums in status in connectionRequest Schema
  - Using Logical Query Operator `{ $or, $and, $not, $nor }` in find() method to check for multiple conditions simultaneously 
  - Adding Index in connectionRequest Schema to optimize search query performance

### enums in Schema 
  - If we want to restrict the value of a field in the schema to a certain values we can use `enums` like this -> 

  ```
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not a valid status",
      },
    },
  ```

### Logical Query Operator to check for multiple conditions simultaneously
  - `$or, $and, $not, $nor`
  ```
  const existingRequest = await ConnectionRequestModel.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });
  ```

### pre() method
  - If we want to add schema level validation for a condition just before the occurance of an event (eg save()) we can use the `pre() method` which is called just before the event occurs.

  - This method makes sure that the `fromUserId` and `toUserId` are not the same before saving the data in DB.

  ```
  connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error("Invalid request, cannot send connection request to yourself");
    }
    next();
  });
  ```
  - Make sure to use `normal function` not `arrow function` inside the pre method or else it will not work.
  - Remember to call the `next()` function or else the code will not move forward

### Indexing in Schema 
  - If your application is repeatedly running queries on the same fields, you can create an index on those fields to improve performance.
  - Although `indexes improve query performance`, adding an index has `negative performance impact for write operations`.
  - For collections with a **high write-to-read ratio**, *indexes are expensive because each insert must also update any indexes*.
  - MongoDB indexes use a `B-tree` data structure.

  - **Simple Indexing** -> 
  ```
  userSchema.index({ firstName: 1});
  ```
  - **Compound Indexing** -> 
  ```
  connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});
  ```

# Node 13
  - Added POST /request/review/:status/:requestId API to accept or reject an incoming connection request.
  - Linking two collections using `ref` and `populate`
  - Create GET /user/requests/received API
  - Create GET /user/connections API

### Using refs to interlink two collections 

  ```
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ```

### Using populate of access data of other collection 
  ```
  .populate("fromUserId", "firstName lastName photoURL");
  
  .populate("fromUserId", ["firstName", "lastName", "photoURL"]);
  ```

# Node 14 
  - Create GET /user/feed API
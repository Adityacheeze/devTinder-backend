const validator = require('validator');

const validateSignUp = (req) => {
  const {firstName, lastName, email, password} = req.body;
  if(!firstName || !lastName){
    throw new Error("First Name and Last Name are required");
  }
  else if(!validator.isEmail(email)){
    throw new Error("Invalid email");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
  }
}

module.exports = { validateSignUp};
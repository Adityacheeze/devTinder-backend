const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email format");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol");
      }
    }
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
    enum: {
      values : ['male', 'female', 'other'],
      message: "{VALUE} is not a valid gender... Gender must be male, female, or other"
    }
    // validate(value) {
    //   if(!['male', 'female', 'other'].includes(value.toLowerCase())){
    //     throw new Error("Gender must be male, female, or other");
    //   }
    // },
  },
  photoURL: {
    type: String,
    default: "https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid URL for profile picture");
      }
    }
  },
  about: {
    type: String,
    default: "Hey there! I am using DevTinder",
  },
  skills: {
    type: [String],
  }
}, {
  timestamps: true,
});
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER_SECRET6278", {
        expiresIn: "1d",
      });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(password, passwordHash);
  return isPasswordValid;
}
const User = mongoose.model("User", userSchema);
module.exports = User;

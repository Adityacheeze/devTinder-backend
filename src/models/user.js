const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
    validate(value) {
      if(!['male', 'female', 'other'].includes(value.toLowerCase())){
        throw new Error("Gender must be male, female, or other");
      }
    },
  },
  photoURL: {
    type: String,
    default: "https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png"
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

const User = mongoose.model("User", userSchema);
module.exports = User;

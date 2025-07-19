const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://developeraditya24:qUahalmhqRkifE2Q@namastenode.umy13r5.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // same email not use in database
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userAuth = mongoose.model("userauth", userSchema);

module.exports = { userAuth };

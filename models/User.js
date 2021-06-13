const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  admin: Boolean,
  favorits: Array,
  phone: Number,
});

module.exports = User = model("user", userSchema);

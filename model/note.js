const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: { type: String, required: true ,  unique: true},
    decription: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
}
);
const User = mongoose.model("User", userSchema);

module.exports = User;

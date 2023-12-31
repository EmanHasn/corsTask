const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true ,  unique: true},
    description: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
}
);
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;

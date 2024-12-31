const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const Task = mongoose.model("todos", taskSchema);

module.exports = Task;

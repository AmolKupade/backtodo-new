const Task = require("../db/task");

async function addTask(model) {
  let task = new Task({
    name: model.name,
  });

  await task.save();

  return task.toObject();
}

async function getTasks() {
  let task = await Task.find();

  return task.map((c) => c.toObject());
}

async function getTaskById(id) {
  let task = await Task.findById(id);

  return task.toObject();
}

async function updateTask(id, model) {
  await Task.findByIdAndUpdate({ _id: id }, model);
  return;
}

async function deleteTask(id) {
  await Task.findByIdAndDelete(id);
  return;
}

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
};

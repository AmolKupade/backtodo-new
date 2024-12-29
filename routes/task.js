const express = require("express");

const router = express.Router();

const Category = require("../db/task");
const {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
} = require("../handelers/task-handeler");

router.post("", async (req, res) => {
  let model = req.body;

  let result = await addTask(model);

  res.send(result);
});

router.get("", async (req, res) => {
  let result = await getTasks();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  let userId = req.params["id"];
  let result = await getTaskById(userId);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  let model = req.body;
  let userId = req.params["id"];

  await updateTask(userId, model);

  res.send({ message: "Updated Successfully" });
});

router.delete("/:id", async (req, res) => {
  let userId = req.params["id"];

  await deleteTask(userId);

  res.send({ message: "Deleted Successfully" });
});

module.exports = router;

const express = require("express");

const mongoose = require("mongoose");

const app = express();

const cors = require("cors");

const PORT = 8002;

app.use(cors());

app.use(express.json());

const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");

app.use("/task", taskRoutes);
app.use("/auth", authRoutes);

async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/", {
    dbName: "todo",
  });
  console.log("MongoDB connected");
}

connectDb().catch((err) => {
  console.error(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

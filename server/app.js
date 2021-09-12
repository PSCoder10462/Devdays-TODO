import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Todo from "./models/todo.model.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

// db config
const db = mongoose.connection;

// fix for deprecations
const DEPRECATED_FIX = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// listen for errors after the connection is established (errors during the session)
db.on("error", (error) => console.log("❌ MongoDB:", error));

// listen when db is disconnected
db.on("disconnected", () => console.log("❌ MongoDB disconnected"));

db.once("open", () => {
  console.log("✅ MongoDB connected");
});

// connect to db
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log("❌ MongoDB:", error));

app.get("/", (req, res) => {
  res.send("hello world!!!");
});

app.get("/all", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

app.post("/add", async (req, res) => {
  try {
    const todo = await Todo.create({
      task: req.body.todo,
    });
    res.status(201).send({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

app.post("/delete", (req, res) => {
  const _id = req.body.id;
  Todo.findByIdAndDelete(_id, (err, data) => {
    err ? res.status(500).send(err) : res.status(202).send(data);
  });
});

app.post("/:todo_id", (req, res) => {
  const { task, completed } = req.body.new_todo;
  Todo.findByIdAndUpdate(
    req.params.todo_id,
    { task, completed },
    (err, data) => {
      err ? res.status(500).send(err) : res.status(201).send(data);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

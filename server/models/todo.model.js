import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { collection: "todo-list" }
);

const model = mongoose.model("todo", todoSchema);

export default model;

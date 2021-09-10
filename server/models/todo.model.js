import mongoose from "mongoose";

const todo = new mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, required: false },
  },
  { collection: "todo-list" }
);

const model = mongoose.model("TodoModel", todo);

export default model;

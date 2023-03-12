import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  assigneeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  isCompleted: Boolean,

  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now()).toLocaleDateString();
    },
  },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;

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
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedDate: {
    type: String,
  },
  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now()).toLocaleDateString();
    },
  },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;

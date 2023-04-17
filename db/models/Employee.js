import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "employee",
  },
  invCode: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // birthday: {
  //   type: String,
  //   required: true,
  // },
  // monthSalary: {
  //   type: Number,
  //   required: true,
  // },
  color: {
    type: String,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now()).toLocaleDateString();
    },
  },
});

const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;

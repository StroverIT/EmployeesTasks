import { connectMongo } from "../../../db/connectDb";

// Helpers
import { getCurrentDate } from "../../../utils/helper";

// Models
import Task from "../../../db/models/Task";
import Employee from "../../../db/models/Employee";

// Db
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongo();

    let { taskId, employeeId } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      { $set: { isCompleted: true, completedDate: getCurrentDate() } }
    );

    const employee = await Employee.findOne({
      _id: new ObjectId(employeeId),
    }).populate("tasks");

    await res.status(200).json({
      message: `Task ${task.title} was completed successfully!`,
      data: employee,
    });
  } catch (err) {
    let error = err;
    console.log(err);
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }
}

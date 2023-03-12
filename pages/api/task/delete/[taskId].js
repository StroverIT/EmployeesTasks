import { connectMongo } from "../../../../db/connectDb";

import Employee from "../../../../db/models/Employee";
import Task from "../../../../db/models/Task";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { taskId } = req.query;

    const task = await Task.findOneAndDelete({
      _id: new ObjectId(taskId),
    });
    await Employee.updateOne(
      { _id: new ObjectId(task.employeeId) },
      { $pull: { tasks: new ObjectId(taskId) } }
    );
    res.status(200).json({ message: `${task.title} was deleted successfully` });
  } catch (err) {
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }

  // const color = generateRandomColor(1);
}

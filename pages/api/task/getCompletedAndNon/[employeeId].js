import { connectMongo } from "../../../../db/connectDb";

import Employee from "../../../../db/models/Employee";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { employeeId } = req.query;
    const employee = await Employee.findOne({
      _id: new ObjectId(employeeId),
    }).populate("tasks");
    const tasks = {
      completed: 0,
      total: employee.tasks.length,
    };
    employee.tasks.forEach((task) => {
      if (task.isCompleted) tasks.completed += 1;
    });
    res.status(200).json({ data: tasks });
  } catch (err) {
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }

  // const color = generateRandomColor(1);
}

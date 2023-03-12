import { connectMongo } from "../../../../db/connectDb";

import Employee from "../../../../db/models/Employee";
import Task from "../../../../db/models/Task";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { employeeId } = req.query;

    const employee = await Employee.findOneAndDelete({
      _id: new ObjectId(employeeId),
    });
    console.log(employee);
    await Task.deleteMany({ employeeId: new ObjectId(employeeId) });
    res
      .status(200)
      .json({ message: `${employee.fullName} was deleted successfully` });
  } catch (err) {
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }

  // const color = generateRandomColor(1);
}

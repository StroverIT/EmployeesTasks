import { connectMongo } from "../../../db/connectDb";

import Employee from "../../../db/models/Employee";
import Task from "../../../db/models/Task";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { inputs, employeeId } = req.body;
    const { fullName, email, phoneNumber, birthday, monthSalary } = inputs;

    await Employee.updateOne(
      { _id: new ObjectId(employeeId) },
      { $set: { fullName, email, phoneNumber, birthday, monthSalary } }
    );

    const newEmployee = await Employee.findOne({
      _id: new ObjectId(employeeId),
    });

    res.status(200).json({
      message: `${newEmployee.fullName} information was edited successfully`,
    });
  } catch (err) {
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }

  // const color = generateRandomColor(1);
}

import { connectMongo } from "../../../db/connectDb";

import Employee from "../../../db/models/Employee";
import Task from "../../../db/models/Task";

import { ObjectId } from "mongodb";
import { formatDate } from "../../../utils/helper";
import { isEmpty } from "../../../utils/errorHandler";

export default async function handler(req, res) {
  try {
    await connectMongo();

    let {
      title,
      dueDate,
      description,
      assignee,
      _id,
      employeeId,
      newAssigneeId,
      newAssigneeName,
    } = req.body;
    dueDate = formatDate(dueDate);

    // Error handlers

    if (assignee == "") {
      return res.json({ error: "Please choose an Employee" });
    }

    if (!isEmpty({ title, dueDate, description })) {
      return res.json({ error: "All fields must be fulfilled!" });
    }
    await Task.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          title,
          dueDate,
          description,
          assignee: newAssigneeName,
          employeeId: new ObjectId(newAssigneeId),
        },
      }
    );
    if (newAssigneeId != employeeId) {
      // remove
      await Employee.updateOne(
        { _id: new ObjectId(employeeId) },
        { $pull: { tasks: new ObjectId(_id) } }
      );

      // add
      await Employee.updateOne(
        { _id: new ObjectId(newAssigneeId) },
        { $push: { tasks: new ObjectId(_id) } }
      );
    }

    res.status(200).json({
      message: `${title} was edited successfully`,
    });
  } catch (err) {
    console.log(err);
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }

  // const color = generateRandomColor(1);
}

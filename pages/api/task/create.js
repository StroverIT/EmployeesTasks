import { connectMongo } from "../../../db/connectDb";

// Error handlers
import { isEmpty } from "../../../utils/errorHandler";

// Helpers
import { formatDate } from "../../../utils/helper";

// Models
import Task from "../../../db/models/Task";
import Employee from "../../../db/models/Employee";

// Db
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    await connectMongo();

    let { title, assignee, dueDate, description, _id } = req.body;
    // Formating

    dueDate = formatDate(dueDate);

    if (assignee == "") {
      return res.json({ error: "Please choose an Employee" });
    }
    // Error handlers
    if (!isEmpty(req.body)) {
      return res.json({ error: "All fields must be fulfilled!" });
    }

    const task = await Task.create({
      title,
      assignee,
      dueDate,
      description,
      employeeId: _id,
    });

    await Employee.updateOne(
      { _id: new ObjectId(_id) },
      { $push: { tasks: task } }
    );

    res.status(200).json({
      message: `Task ${title} was created successfully!`,
      task,
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

import { connectMongo } from "../../../db/connectDb";

import Task from "../../../db/models/Task";

import { ObjectId } from "mongodb";
import { getCurrentDate } from "../../../utils/helper";

export default async function handler(req, res) {
  try {
    await connectMongo();

    const tasks = await Task.find({ isCompleted: true });

    const nameAndTasks = {};

    const currentDate = getCurrentDate().split(".");

    tasks.forEach((task) => {
      const condition = task.completedDate.split(".");

      if (!nameAndTasks.hasOwnProperty(task.assignee)) {
        nameAndTasks[task.assignee] = 0;
      }
      if (currentDate[1] == condition[1] && currentDate[2] == condition[2]) {
        nameAndTasks[task.assignee] += 1;
      }
    });
    const data = Object.entries(nameAndTasks)
      .map((data) => {
        return [data[0], data[1]];
      })
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    res.status(200).json({ data });
  } catch (err) {
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }
}

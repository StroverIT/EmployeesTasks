import { connectMongo } from "../../../db/connectDb";

import Task from "../../../db/models/Task";

import { ObjectId } from "mongodb";
import { months, numToMonth } from "../../../utils/helper";
export default async function handler(req, res) {
  try {
    await connectMongo();

    const tasks = await Task.find({ isCompleted: true }).populate("employeeId");

    const nameAndTasks = {};

    tasks.forEach((task) => {
      const id = task.employeeId._id.toString();

      if (!nameAndTasks.hasOwnProperty(id)) {
        nameAndTasks[id] = {
          total: 0,
          name: task.assignee,
          color: task.employeeId.color,
          task: [],
        };
      }

      nameAndTasks[id].total++;

      nameAndTasks[id].task.push(task);
    });
    const toArray = Object.entries(nameAndTasks)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5);

    toArray.forEach((arrayTask) => {
      months.forEach((month) => {
        arrayTask[1][month] = 0;
      });
      arrayTask[1].task.forEach((task) => {
        const month = numToMonth(task.completedDate);
        arrayTask[1][month] += 1;
      });

      delete arrayTask[1].task;
      delete arrayTask[1].total;
      arrayTask[1].data = [];
      Object.values(arrayTask[1]).forEach((value) => {
        const condition = Number.isInteger(value);
        if (condition) {
          arrayTask[1].data.push(value);
        }
      });
    });
    const sanitazedArr = toArray.map((arr) => {
      return {
        // _id: arr[0],
        label: arr[1].name,
        data: arr[1].data,
        borderColor: arr[1].color,
        backgroundColor: arr[1].color,
      };
    });
    res.json({ data: sanitazedArr });
  } catch (err) {
    console.log(err);
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }
}

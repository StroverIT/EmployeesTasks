import { connectMongo } from "../../../db/connectDb";
import Employee from "../../../db/models/Employee";
import { isEmpty } from "../../../utils/errorHandler";
import { formatDate, generateRandomColor } from "../../../utils/helper";

export default async function handler(req, res) {
  try {
    await connectMongo();

    let { birthday, fullName } = req.body;
    const totalEmployee = await Employee.count();

    const color = generateRandomColor(totalEmployee + 1);

    // Formating
    req.body.birthday = formatDate(birthday);

    // Error handlers
    if (!isEmpty(req.body)) {
      return res.json({ error: "All fields must be fulfilled!" });
    }
    await Employee.create({ ...req.body, color });
    res
      .status(200)
      .json({ message: `Employee ${fullName} was created successfully!` });
  } catch (err) {
    let error = err;
    if (err.name) {
      error = err.name;
    }
    res.json({ error });
  }
}

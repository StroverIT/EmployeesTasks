import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import Employee from "../../../db/models/Employee";
import { connectMongo } from "../../../db/connectDb";

import { hash } from "bcryptjs";
import { generateRandomColor, generateString } from "../../../utils/helper";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    let { email, password, code, name, fullName, phoneNumber } = req.body;
    let role = name.toLowerCase();

    //Validate
    if (!email || !password || !fullName || !phoneNumber) {
      return res.json({ error: "Всички полета трябва да бъдат попълнени" });
    }

    //Connect with database
    await connectMongo();
    //Check existing
    const totalEmployee = await Employee.count();
    const checkExisting = await Employee.findOne({ email });

    //Send error response if duplicate user is found
    if (checkExisting) {
      return res.json({ error: "Вече съществува такъв и-мейл" });
    }
    if (role == "boss") {
      code = generateString(6);
      // code = "123";
      const isFound = await Employee.findOne({ invCode: code, role: "boss" });
      console.log(isFound);
    }

    const color = generateRandomColor(totalEmployee + 1);

    await Employee.create({
      email,
      password: await hash(password, 12),
      role,
      invCode: code,
      fullName,
      phoneNumber,
      color,
    });

    return res.json({ message: "Добре дошли!" });
    //Send success response
    //Close DB connection
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;

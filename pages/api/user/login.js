// import connectDb from "../../../config/connectDb";
import connectDb from "../../../config/connectDB";
import { User } from "../../../models/userModel";
import messagehandler from "../../../utils/messagehandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function login(req, res) {
  try {
    if (req.method !== "POST")
      return messagehandler(res, 400, "Only POST Method is allowed");

    await connectDb();

    const { email, password } = req.body;

    if (email === "" || password === "") {
      messagehandler(res, 400, "All credentials Required!");
    }

    const user = await User.findOne({ email });
    if (user) {
      const verifyPass = await bcrypt.compare(password, user.password);

      if (verifyPass) {
        const userId = user._id;
        const secretKey = "heellothisisthessecretKey";
        const token = jwt.sign({ userId }, secretKey);

        messagehandler(res, 200, "Logged in succesfully", token , userId );
      } else {
        messagehandler(res, 400, "Pass incorrect");
      }
    } else {
      messagehandler(res, 404, "user not Found");
    }
  } catch (error) {
    console.log(error);
  }
}
// import connectDb from "../../../config/connectDb";
// import connectDb from "../../../config/connectDb";
import connectDb from "../../../config/connectDB";
import { User } from "../../../models/userModel";
import messagehandler from "../../../utils/messagehandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function register(req, res) {
  try {
    if (req.method !== "POST")
      return messagehandler(res, 400, "Only POST Method is allowed");

    await connectDb();

    const { username, email, password } = req.body;

    if (username === "" || email === "" || password === "") {
      messagehandler(res, 400, "All credentials Required!");
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
      return messagehandler(res, 400, "User Already Exists");
    }

    const passcrypt = await bcrypt.hash(password, 10);

    if (passcrypt) {
      const newUser = await User.create({
        username,
        email,
        password: passcrypt,
      });

      const userId = newUser._id;

      const secretKey = "heellothisisthessecretKey";

      const token = jwt.sign({ userId }, secretKey);

      return messagehandler(
        res,
        200,
        "User created Succesfully!",
        token,
        userId
      );
    }
  } catch (error) {
    console.log(error);
  }
}
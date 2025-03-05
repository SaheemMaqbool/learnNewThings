// import connectDb from "../../../../config/connectDb";
// import connectDb from "../../../../config/connectDb";
import connectDb from "../../../../config/connectDB";
import { Task } from "../../../../models/taskModel";
import { User } from "../../../../models/userModel";
import messagehandler from "../../../../utils/messagehandler";

export default async function create(req, res) {
  try {
    if (req.method !== "POST")
      return messagehandler(res, 400, "Only POST Method is allowed");

    await connectDb();

    const { title, description } = req.body;

    if (title === "" || description === "") {
      return messagehandler(
        res,
        400,
        "Title and Description both are required!"
      );
    }

    const { userId } = req.query;

    const user = await User.findById(userId);

    const time = new Date(Date.now() + 19800000);    // 5:30

    console.log(time);

    const newTask = await Task.create({
      title,
      description,
      userId,
      status: "pending",
    });

    user.tasks.push(newTask._id);
    const userUpdate =  await user.save();

    if (newTask && userUpdate) {
      return messagehandler(res, 200, "Task Created!");
    } else {
      return messagehandler(res, 400, "Something Went wrong");
    }
  } catch (error) {
    console.log(error);

    return messagehandler(res, 500, "Server Error");
  }
}
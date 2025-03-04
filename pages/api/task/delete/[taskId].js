// import connectDb from "../../../../config/connectDb";
import connectDb from "../../../../config/connectDB";
import { Task } from "../../../../models/taskModel";
import messagehandler from "../../../../utils/messagehandler";

export default async function deleted(req, res) {
  try {
    if (req.method !== "GET")
      return messagehandler(res, 400, "Only GET Method is allowed");
    await connectDb();

    const { taskId } = req.query;

    const findTask = await Task.findByIdAndDelete (taskId);

    if (!findTask) {
      messagehandler(res, 404, "No Task Found");
    } else {
      messagehandler(res, 200, "Task Deleted");
    }
  } catch (error) {
    console.log(error);

    return messagehandler(res, 500, "Server Error");
  }
}
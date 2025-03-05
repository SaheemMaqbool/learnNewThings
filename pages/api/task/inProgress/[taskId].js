// import connectDb from "../../../../config/connectDb";
import connectDb from "../../../../config/connectDB";
import { Task } from "../../../../models/taskModel";
import messagehandler from "../../../../utils/messagehandler";

export default async function inProgress(req, res) {
  try {
    if (req.method !== "GET")
      return messagehandler(res, 400, "Only GET Method is allowed");
    await connectDb();

    const { taskId } = req.query;

    const findTask = await Task.findById(taskId);

    if (!findTask) {
      messagehandler(res, 404, "No Task Found");
    } else {
      findTask.status = "inProgress";
      await findTask.save();

      messagehandler(res, 200, "Task status Changed");
    }
  } catch (error) {
    console.log(error);

    return messagehandler(res, 500, "Server Error");
  }
}
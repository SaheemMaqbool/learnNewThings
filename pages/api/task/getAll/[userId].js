// import connectDb from "../../../../config/connectDb";
// import connectDb from "../../../../config/connectDb";
import connectDb from "../../../../config/connectDB";
import { Task } from "../../../../models/taskModel";
import messagehandler from "../../../../utils/messagehandler";

export default async function getAll(req, res) {
  try {
    await connectDb();

    if (req.method !== "GET")
      return messagehandler(res, 400, "Only GET Method is allowed");

    const {userId} = req.query

    const tasks = await Task.find({userId : userId});

    if (tasks) {  
      messagehandler(res, 200, `${tasks.length }tasks Found` ,  tasks);
    } else {
      messagehandler(res, 400, "some Error");
    }
  } catch (error) {
    console.log(error);
    messagehandler(res, 500, "server Error");
  }
}
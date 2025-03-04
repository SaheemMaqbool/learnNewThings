
import mongoose from "mongoose";

const uri = "mongodb+srv://saheemvani1234:Saheem1@nextjsproj.wwxcs.mongodb.net/nextTODO?retryWrites=true&w=majority&appName=nextJSproj"

const connectDb = async () => {


  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;
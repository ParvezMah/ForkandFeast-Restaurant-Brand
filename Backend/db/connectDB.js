// mongodbpassword=VvfbecDj4QpffJc6
// mongodbusername=parvezmahmudaa100

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is Connected : ");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
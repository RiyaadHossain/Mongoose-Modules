import app from "./app";
import mongoose from "mongoose";

// Database connection
async function dbConnection() {
  await mongoose.connect("mongodb://127.0.0.1:27017/node-mongodb");
}

dbConnection()
  .then(() => console.log("Database connected Successfully"))
  .catch((err) => console.log(err));

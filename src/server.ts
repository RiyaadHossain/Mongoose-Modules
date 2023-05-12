import app from "./app";
import mongoose from "mongoose";

const port: number = 5000;

// Database connection
async function dbConnection() {
  await mongoose.connect("mongodb://127.0.0.1:27017/practice-mongoose");
}

dbConnection()
  .then(() => console.log("Database connected Successfully"))
  .catch((err: Error) => console.log(err));

// Server Listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

// Database connection
async function dbConnection() {
  await mongoose.connect("mongodb://127.0.0.1:27017/node-mongodb");
}

dbConnection()
  .then(() => console.log("Database connected Successfully"))
  .catch((err) => console.log(err));

// Health Check
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server Listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

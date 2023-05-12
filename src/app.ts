import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

// Use cors
app.use(cors());

// Health Check
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server Listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;

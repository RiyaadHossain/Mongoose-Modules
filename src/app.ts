import { Application, Request, Response } from "express-serve-static-core";
import express from "express";
import cors from "cors";
import { Schema, model } from "mongoose";
const app: Application = express();
const port: number = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req: Request, res: Response) => {
  // 1. Create Interface
  interface IUser {
    id: number;
    role: "student";
    name: {
      firstName: string;
      lastName: string;
    };
    dateOfBirth?: string;
    gender: "male" | "female";
    email?: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAdress: string;
  }

  // 2. Define Schema
  const userSchema = new Schema<IUser>({
    id: { type: Number, required: true },
    role: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    dateOfBirth: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    email: String,
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAdress: { type: String, required: true },
  });

  // 3. Creating Model
  const User = model("User", userSchema);
});

// Server Listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;

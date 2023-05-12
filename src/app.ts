import { Application, Request, Response } from "express-serve-static-core";
import { Schema, model } from "mongoose";
import express from "express";
import cors from "cors";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", async (req: Request, res: Response) => {
  // 1. Create Interface
  interface IUser {
    name: {
      firstName: string;
      lastName: string;
    };
    role: "student";
    dateOfBirth?: string;
    gender: "male" | "female";
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAdress: string;
  }

  // 2. Define Schema
  const userSchema = new Schema<IUser>({
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    role: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAdress: { type: String, required: true },
  });

  // 3. Creating Model
  const User = model<IUser>("User", userSchema);

  const newUser = new User({
    name: {
      firstName: "Riyad",
      lastName: "Hossain",
    },
    role: "student",
    dateOfBirth: "11 March, 2001",
    gender: "male",
    email: "riyad@gmail.com",
    contactNo: "01703790978",
    emergencyContactNo: "01703790978",
    presentAddress: "Bangladesh",
    permanentAdress: "Bangladesh",
  });

  const userData = await newUser.save();
  res.status(200).json(userData);
});

export default app;

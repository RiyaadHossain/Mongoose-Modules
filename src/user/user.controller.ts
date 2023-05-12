import { User } from "./user.model";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
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
};

export default { createUser };

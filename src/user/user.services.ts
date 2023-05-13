import { User } from "./user.model";

export const createUserService = async () => {
  const newUser = new User({
    name: {
      firstName: "Riyad",
      lastName: "Hossain",
    },
    role: "student",
    dateOfBirth: "11 March, 2001",
    gender: "male",
    email: "riyad1@gmail.com",
    contactNo: "01703790978",
    emergencyContactNo: "01703790978",
    presentAddress: "Bangladesh",
    permanentAdress: "Bangladesh",
  });

  const userData = await newUser.save();
  return userData;
};

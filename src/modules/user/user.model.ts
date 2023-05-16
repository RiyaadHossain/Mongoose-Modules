import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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

// Instance Method
userSchema.static("getAdmins", async function getAdmins() {
  const admins = await this.find({ role: "admin" });
  return admins;
});

// Instance Method
userSchema.method("fullName", function fullName() {
  return `${this.name.firstName} ${this.name.lastName}`;
});

export const User = model<IUser, UserModel>("User", userSchema);

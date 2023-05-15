import { HydratedDocument, Model } from "mongoose";

export interface IUser {
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

export interface IUserMethods {
  fullName(): string;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  getAdmins(): Promise<HydratedDocument<IUser, IUserMethods>>;
}

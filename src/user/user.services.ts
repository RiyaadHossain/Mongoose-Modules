import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUserService = async (payload: IUser): Promise<IUser> => {
  const newUser = new User(payload);
  const userData = await newUser.save();
  return userData;
};

export const getUsersService = async (): Promise<IUser[]> => {
  const userData = await User.find();
  return userData;
};

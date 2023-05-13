import { IUser } from "./user.interface";
import { User } from "./user.model";

// 1. Create User Service_______________________________________
export const createUserService = async (payload: IUser): Promise<IUser> => {
  const newUser = new User(payload);
  const userData = await newUser.save(); // Built-in Instance Method: A instance method works with a instance or class. Like: new User()
  console.log(userData.fullName()); // Custom Instance Method. 
  return userData;
};

// 2. Get Users Service_______________________________________
export const getUsersService = async (): Promise<IUser[]> => {
  const userData = await User.find();
  return userData;
};

// 3. Get User By ID Service_______________________________________
export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  const userData = await User.findById(id);
  return userData;
};

// 4. Get Admin User Service_______________________________________
export const getAdminUsersServices = async () => {
  const userData = await User.getAdmins();
  return userData;
};

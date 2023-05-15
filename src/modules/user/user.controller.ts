import { Request, Response } from "express";
import {
  createUserService,
  getAdminUsersServices,
  getUserByIdService,
  getUsersService,
} from "./user.services";

// 1. Create User_______________________________________
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await createUserService(userData);
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get Users_______________________________________
const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await getUsersService();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get User_______________________________________
const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getUserByIdService(id);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Get Admin Users_______________________________________
const getAdminUsers = async (req: Request, res: Response) => {
  try {
    const data = await getAdminUsersServices()
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createUser, getUsers, getUser, getAdminUsers };

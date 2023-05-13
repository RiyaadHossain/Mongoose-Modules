import { Request, Response } from "express";
import { createUserService, getUsersService } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await createUserService(userData);
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await getUsersService();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createUser, getUsers };

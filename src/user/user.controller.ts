import { Request, Response } from "express";
import { createUserService } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = await createUserService();
    res.status(200).json({ status: "success", userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createUser };

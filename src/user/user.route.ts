import express from "express";
import controller from "./user.controller";
const route = express.Router();

route.get("/", controller.getUsers);
route.get("/:id", controller.getUser);
route.post("/create-user", controller.createUser);

export default route;

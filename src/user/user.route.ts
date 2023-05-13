import express from "express";
import controller from "./user.controller";
const route = express.Router();

route.get("/", controller.createUser);

export default route;

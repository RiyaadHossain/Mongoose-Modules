import { Application, Request, Response } from "express-serve-static-core";
import express from "express";
import cors from "cors";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
import userRoute from "./modules/user/user.route";

// Routes Middleware
app.use("/api/v1/user", userRoute);

export default app;

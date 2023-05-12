import { Application, Request, Response } from "express-serve-static-core";
import { Schema, model } from "mongoose";
import express from "express";
import cors from "cors";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
// app.get("/", async (req: Request, res: Response) => {

// });

export default app;

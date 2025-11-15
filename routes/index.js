import express from "express";
import { notesRouter } from "./notes.js";

export const rootRouter = express.Router();

rootRouter.use("/notes", notesRouter);

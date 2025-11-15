import express from "express";
import { addNewNote, getNoteById, getNotes, removeNote } from "../controllers/notesControllers.js";

export const notesRouter = express.Router();

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.post("/", addNewNote);
notesRouter.post("/:id", removeNote);

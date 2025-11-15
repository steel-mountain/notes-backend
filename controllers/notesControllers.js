import { notesLocal } from "../data/notes.js";

export const getNotes = (req, res) => {
  res.send(notesLocal);
};

export const addNewNote = (req, res) => {
  notesLocal.push(req.body);
  res.send("add new note!");
};

export const getNoteById = (req, res) => {
  res.send("note by id!");
};

export const removeNote = (req, res) => {
  res.send("remove note!");
};

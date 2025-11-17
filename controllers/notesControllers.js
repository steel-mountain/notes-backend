import { ObjectId } from "mongodb";
import client from "./db.js";

export const getNotes = async (req, res) => {
  try {
    const database = client.db("notesdb");
    const collection = database.collection("notes");

    const notesFromDB = await collection.find().toArray();

    res.json(notesFromDB);
  } catch (err) {
    console.error("Ошибка получения данных из MongoDB:", err.message);
    res.status(500).json({ error: "Ошибка получения данных из MongoDB", message: err.message });
  }
};

export const addNewNote = async (req, res) => {
  const newNote = req.body;

  try {
    const database = client.db("notesdb");
    const collection = database.collection("notes");

    await collection.insertOne(newNote);

    res.send("Заметка успешно добавлена в базу данных!");
  } catch (err) {
    console.error("Ошибка получения данных из MongoDB:", err.message);
    res.status(500).json({ error: "Ошибка получения данных из MongoDB", message: err.message });
  }
};

export const getNoteById = async (req, res) => {
  res.send("getNoteById");
};

export const removeNote = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Не указан id заметки" });
    }

    const database = client.db("notesdb");
    const collection = database.collection("notes");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Заметка не найдена" });
    }

    res.json({ message: "Заметка удалена", id });
  } catch (err) {
    console.error("Ошибка удаления заметки:", err.message);
    res.status(500).json({ error: "Ошибка удаления заметки", message: err.message });
  }
};

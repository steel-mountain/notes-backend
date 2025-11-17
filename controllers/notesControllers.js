import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export const getNotes = async (req, res) => {
  let dbConnected = false;

  try {
    await client.connect();
    dbConnected = true;

    const database = client.db("notesdb");
    const collection = database.collection("notes");

    const notesFromDB = await collection.find().toArray();

    res.json(notesFromDB);
  } catch (err) {
    console.error("Ошибка получения данных из MongoDB:", err.message);
    res.status(500).json({ error: "Ошибка получения данных из MongoDB", message: err.message });
  } finally {
    if (dbConnected) await client.close();
  }
};

export const addNewNote = async (req, res) => {
  const newNote = req.body;
  let dbConnected = false;

  try {
    await client.connect();
    dbConnected = true;

    const database = client.db("notesdb");
    const collection = database.collection("notes");

    await collection.insertOne(newNote);

    res.send("Заметка успешно добавлена в базу данных!");
  } catch (err) {
    console.error("Ошибка получения данных из MongoDB:", err.message);
    res.status(500).json({ error: "Ошибка получения данных из MongoDB", message: err.message });
  } finally {
    if (dbConnected) await client.close();
  }
};

export const getNoteById = (req, res) => {
  res.send("note by id!");
};

export const removeNote = (req, res) => {
  res.send("remove note!");
};

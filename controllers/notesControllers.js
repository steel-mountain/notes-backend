import { MongoClient } from "mongodb";
import { notesLocal } from "../data/notes.js";

// const uri = "mongodb://root:example@localhost:27017";
const uri = "mongodb://root:example@mongo:27017";
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

    res.json(notesLocal); // fallback если БД недоступна
  } finally {
    if (dbConnected) await client.close();
  }
  res.send(notesLocal);
};

export const addNewNote = async (req, res) => {
  const newNote = req.body;
  let dbConnected = false;

  console.log("???");

  try {
    await client.connect();
    dbConnected = true;

    const database = client.db("notesdb");
    const collection = database.collection("notes");

    await collection.insertOne(newNote);

    res.send("Заметка успешно добавлена в базу данных!");
  } catch (err) {
    console.error("Ошибка подключения к MongoDB:", err.message);

    notesLocal.push(newNote);

    res.send("База недоступна — заметка сохранена локально!");
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

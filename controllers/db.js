import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

await client.connect();
console.log("MongoDB connected");

export default client;

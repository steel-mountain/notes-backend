import cors from "cors";
import express from "express";
import { rootRouter } from "./routes/index.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", rootRouter);
app.listen(PORT, () => console.log("Server is started on port", PORT));

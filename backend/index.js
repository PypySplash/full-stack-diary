import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Import the Diary model and routes
//import Diary from './models/diary.js';
import diaryRouter from "./routes/diary.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/diaryCards", diaryRouter);

// Register routers for diary management
//app.use('/api/diaries', diaryRouter);

app.get("/heartbeat", (_, res) => {
  return res.send({ message: "Hello World!" });
});

/* global process */
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`),
    );
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

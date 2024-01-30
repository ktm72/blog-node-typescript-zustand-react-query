import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DB = process.env.DB || "blog";
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://${USER}:${PASS}@cluster0.o2joz8k.mongodb.net/${DB}?retryWrites=true&w=majority`;

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

const db = mongoose
  .connect(connectionString, options)
  .then((res) => {
    if (res) {
      console.log(`Database connected successfully to ${DB}`);
    }
  })
  .catch((err) => {
    console.log(err);
  });
export default db;

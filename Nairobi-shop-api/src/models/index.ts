import mongoose from "mongoose";
import config from "../config";
import Product from "./product";
const MONGO_URI = config.app.MONGO_URI;

mongoose.set("debug", config.app.ENV === "dev");

mongoose
  .connect(MONGO_URI)
  .catch((error) => console.error(error.message));
const db = mongoose.connection;

export default db;

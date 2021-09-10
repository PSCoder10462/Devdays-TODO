import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

// db config
const db = mongoose.connection;

// fix for deprecations
const DEPRECATED_FIX = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// listen for errors after the connection is established (errors during the session)
db.on("error", (error) => console.log("❌ MongoDB:", error));

// listen when db is disconnected
db.on("disconnected", () => console.log("❌ MongoDB disconnected"));

db.once("open", () => {
  console.log("✅ MongoDB connected");
});

// connect to db
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log("❌ MongoDB:", error));

app.get("/", (req, res) => {
  res.send("hello world!!!");
});

app.get("/all", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
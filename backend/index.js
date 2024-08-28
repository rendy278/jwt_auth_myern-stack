import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/koneksi.js";
import User from "./models/usersModels.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

// Konfigurasi CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Ganti dengan origin yang diizinkan
    methods: ["GET", "POST", "PUT", "DELETE"], // Metode yang diizinkan
    credentials: true, // Jika menggunakan cookie atau autentikasi
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(router);

async function startServer() {
  try {
    const db = await connectDB();
    const UserModel = User(db);
    await UserModel.sync();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error(
      "Failed to connect to the database. Server not started.",
      error
    );
  }
}

startServer();

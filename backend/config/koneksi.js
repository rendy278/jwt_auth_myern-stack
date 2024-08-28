import { Sequelize } from "sequelize";

async function connectDB() {
  const koneksi = new Sequelize("auth_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });

  try {
    await koneksi.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }

  return koneksi;
}

export default connectDB;

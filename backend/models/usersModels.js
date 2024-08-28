import { DataTypes } from "sequelize";

// Fungsi untuk mendefinisikan model User
const User = (db) => {
  return db.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true, // Email harus unik
      },
      password: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true, // Mencegah Sequelize mengubah nama tabel menjadi bentuk jamak
    }
  );
};

export default User;

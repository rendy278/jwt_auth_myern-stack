import User from "../models/usersModels.js";
import connectDB from "../config/koneksi.js";
import jwt from "jsonwebtoken";

const database = await connectDB();
const user = User(database);

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const users = await user.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (users.length === 0) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const userId = users[0].id;
        const name = users[0].name;
        const email = users[0].email;

        const accessToken = jwt.sign(
          { userId, name, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.sendStatus(500);
  }
};

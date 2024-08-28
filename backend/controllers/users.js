import connectDB from "../config/koneksi.js";
import User from "../models/usersModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const DB = await connectDB();
const user = User(DB);

export const getUser = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password Tidak Cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await user.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  try {
    const player = await user.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (player.length === 0) {
      return res.status(400).json({ msg: "Email Tidak Ditemukan" });
    }

    const match = await bcrypt.compare(req.body.password, player[0].password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const userId = player[0].id;
    const name = player[0].name;
    const email = player[0].email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await user.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const yuser = await user.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!yuser[0]) return res.sendStatus(204);
  const userId = yuser[0].id;
  await user.update({ refresh_token: null }, { where: { id: userId } });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

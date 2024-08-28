import express from "express";
import { getUser, Login, Logout, Register } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
const router = express.Router();

router.get("/users", verifyToken, getUser);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;

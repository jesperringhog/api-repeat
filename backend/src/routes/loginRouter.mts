import express from "express";
import { loginUser } from "../controllers/loginController.mjs";
import jwt from "jsonwebtoken";
import { dbUserToDto } from "../models/User.mjs";
import type { LoginReq } from "../models/requests/LoginReq.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password }: LoginReq = req.body;

  if (!email && email.trim() === "")
    return res.status(400).json({ message: "Invalid email credential" });
  if (!password && password.trim() === "")
    return res.status(400).json({ message: "Invalid password credential" });

  try {
    const userDto = await loginUser({ email, password });

    if (userDto) {
      const token = jwt.sign(userDto, process.env.JWT_SECRET!);

      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      res.cookie("login", token, {
        httpOnly: true,
        expires,
        sameSite: "none",
        secure: true,
      });

      return res.status(200).json({ name: userDto.username });
    }

    res.status(400).json({ message: "Login failed" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

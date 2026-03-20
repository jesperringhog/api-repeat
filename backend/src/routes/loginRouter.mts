import express from "express";
import { loginUser } from "../controllers/loginController.mjs";
import jwt from "jsonwebtoken";
import { dbUserToDto } from "../models/User.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "")
    return res.status(400).json({ message: "Invalid email credential" });
  if (!password && password.trim() === "")
    return res.status(400).json({ message: "Invalid password credential" });

  try {
    const loggedInUser = await loginUser(email, password);

    const token = jwt.sign(dbUserToDto(loggedInUser), process.env.JWT_SECRET!);

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    res.cookie("login", token, {
      httpOnly: false,
      expires,
    })

    res.status(200).json({ name: loggedInUser.name });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

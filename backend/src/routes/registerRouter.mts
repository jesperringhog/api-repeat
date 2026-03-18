import express from "express";
import type { User } from "../models/User.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, password }: User = req.body;

  if (!name && name.trim() === "")
    return res.status(400).json({ message: "No valid name input" });
  if (!email && email.trim() === "")
    return res.status(400).json({ message: "No valid email input" });
  if (!password && password.trim() === "")
    return res.status(400).json({ message: "No valid password input" });

  try {
    const createdUser = await createUser({name, email, password});
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

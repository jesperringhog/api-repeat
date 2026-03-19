import express from "express";
import { dbUserToDto, type dbUser, type User } from "../models/User.mjs";
import { createUser } from "../controllers/registerController.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, password }: dbUser = req.body;

  if (!name && name.trim() === "")
    return res.status(400).json({ message: "No valid name input" });
  if (!email && email.trim() === "")
    return res.status(400).json({ message: "No valid email input" });
  if (!password && password.trim() === "")
    return res.status(400).json({ message: "No valid password input" });

  try {
    const success = await createUser({ name, email, password });

    if (!success) return res.status(404).json({ message: "Register failed" });

    const dto = dbUserToDto(success);

    res.status(200).json(dto);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

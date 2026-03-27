import express from "express";
import { createUser } from "../controllers/registerController.mjs";
import { dbUserToDto, type dbUser } from "../models/User.mjs";
import type { RegisterReq } from "../models/requests/RegisterReq.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { username, email, password }: RegisterReq = req.body;

  if (!username && username.trim() === "")
    return res.status(400).json({ message: "No valid username input" });
  if (!email && email.trim() === "")
    return res.status(400).json({ message: "No valid email input" });
  if (!password && password.trim() === "")
    return res.status(400).json({ message: "No valid password input" });

  try {
    const userDto = await createUser({ username, email, password });

    res.status(200).json(userDto);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

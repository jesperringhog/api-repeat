import express from "express";
import { loginUser } from "../controllers/loginController.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "")
    return res.status(400).json({ message: "Invalid email credential" });
  if (!password && password.trim() === "")
    return res.status(400).json({ message: "Invalid password credential" });

  try {
    const loggedInUser = await loginUser(email, password);

    if (!loggedInUser) return res.status(404).json({ message: "Login failed" });

    res.status(200).json({ message: `${loggedInUser.name} is now logged in` });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

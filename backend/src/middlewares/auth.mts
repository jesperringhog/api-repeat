import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginToken = req.cookies["login"];
    if (!loginToken) return res.status(401).send("You are not logged in");

    const user = jwt.decode(loginToken);
    if (!user) return res.status(401).send("You are not logged in");

    const foundUser = await User.findOne({ email: (user as UserDTO).email });
    if (!foundUser)
      return res.status(401).send("You are logged in but unauthorized");

    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

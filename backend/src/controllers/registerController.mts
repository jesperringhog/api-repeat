import bcrypt from "bcryptjs";
import User, { dbUserToDto, type dbUser } from "../models/User.mjs";
import type { RegisterReq } from "../models/requests/RegisterReq.mjs";

export const createUser = async (req: RegisterReq) => {
  const found = await User.findOne({ email: req.email });

  if (found) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.password, salt);

  const user = {
    username: req.username,
    email: req.email,
    password: hash,
  };

  const newUser = await User.create(user);

  return dbUserToDto(newUser);
};

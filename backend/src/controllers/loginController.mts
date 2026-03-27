import bcrypt from "bcryptjs";
import User, { dbUserToDto } from "../models/User.mjs";
import type { LoginReq } from "../models/requests/LoginReq.mjs";

export const loginUser = async (req: LoginReq) => {
  const found = await User.findOne({ email: req.email });

  if (!found) throw Error(`Can not find user with email: ${req.email}`);

  const success = await bcrypt.compare(req.password, found.password);

  if (!success) throw Error("Invalid credentials");

  return dbUserToDto(found);
};

import bcrypt from "bcryptjs";
import { User, type dbUser } from "../models/User.mjs";

export const loginUser = async (email: string, password: string) => {
  const found = await User.findOne({ email });

  if (!found) throw Error(`Can not find user with email: ${email}`);

  const success = await bcrypt.compare(password, found.password);

  if (!success) throw Error("Invalid credentials");

  return found;
};

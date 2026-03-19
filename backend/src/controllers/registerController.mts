import bcrypt from "bcryptjs";
import { dbUserToDto, User, type dbUser } from "../models/User.mjs";

export const createUser = async (user: dbUser) => {
    const found = await User.findOne({email: user.email});

    if (found) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = salt;

    return await User.create(user);
}
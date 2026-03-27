import { model, Schema, type InferSchemaType } from "mongoose";
import type { UserDTO } from "./UserDTO.mjs";

const userSchema = new Schema({
  username: { type: String, required: true, minLength: 2 },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("user", userSchema);

export default User;

export type dbUser = InferSchemaType<typeof userSchema>;

export const dbUserToDto = (dbuser: dbUser): UserDTO =>
  ({
    username: dbuser.username,
    email: dbuser.email,
  } satisfies UserDTO);

import { model, Schema, type InferSchemaType } from "mongoose";
import type { UserDTO } from "./UserDTO.mjs";

const userSchema = new Schema({
  name: { type: String, required: true, minLength: 2 },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = model("user", userSchema);

export type dbUser = InferSchemaType<typeof userSchema>;

export const dbUserToDto = (dbuser: dbUser): UserDTO =>
  ({
    name: dbuser.name,
    email: dbuser.email,
    password: dbuser.password,
  } satisfies UserDTO);

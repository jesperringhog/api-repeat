import { Schema } from "mongoose";
import { User } from "./User.mjs";

const messageSchema = new Schema({
    user: { type: User, required: true},
    message: { type: String, required: true }
})
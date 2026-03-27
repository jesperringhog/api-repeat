import { model, Schema } from "mongoose";
import { messageSchema } from "./Message.mjs";

const chatSchema = new Schema({
    name: { type: String, required: true},
    messages: { type: [messageSchema], required: true}
})

const Chat = model("chat", chatSchema);

export default Chat;
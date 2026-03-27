import type { Socket } from "socket.io-client";
import type { Message } from "../models/Message";
import { createMessageHtml } from "../utils/createMessageHtml";

export const socketOnChatHistory = (socket: Socket) => {
    socket.on("chatHistory", (messages: Message[]) => {
        messages.forEach((m) => createMessageHtml(m));
    })
}
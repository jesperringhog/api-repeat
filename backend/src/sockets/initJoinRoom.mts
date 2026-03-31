import type { Socket } from "socket.io";
import Chat from "../models/Chat.mjs";

export const initJoinRoom = (socket: Socket) => {
  socket.on("joinRoom", async (room: string) => {
    socket.join(room);

    const foundChat = await Chat.findOne({ name: room });

    if (foundChat) {
      socket.emit("chatHistory", foundChat.messages);
    }
  });
}
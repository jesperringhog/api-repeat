import type { Server, Socket } from "socket.io";
import type { Message } from "../models/Message.mjs";
import Chat from "../models/Chat.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";
import jwt from "jsonwebtoken";

export const initSendMessage = (socket: Socket, loginCookie: string | undefined, io: Server) => {
  socket.on("sendMessage", async (message: Message, room: string) => {
    const foundChat = await Chat.findOne({ name: room });

    if (foundChat && loginCookie) {
      const userDto = jwt.decode(loginCookie) as UserDTO;

      message.from = userDto.username;
      foundChat.messages.push(message);

      await foundChat.save();
    } else {
      console.error(`Could not find chat: ${room}`);
    }

    io.to(room).emit("message", message);
  });
}
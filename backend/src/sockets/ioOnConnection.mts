import type { Server } from "socket.io";
import cookie from "cookie";
import Chat from "../models/Chat.mjs";
import type { Message } from "../models/Message.mjs";
import jwt from "jsonwebtoken";
import type { UserDTO } from "../models/UserDTO.mjs";

export const ioOnConnection = (io: Server) => {
  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);
    // console.log("All handshake headers:", socket.handshake.headers);
    // console.log("Raw cookie header:", socket.handshake.headers.cookie);

    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const loginCookie = cookies.login;

    if (loginCookie) {
      const chats = await Chat.find();
      const rooms = chats.map((c) => c.name);

      socket.emit("roomList", rooms);
    }
    
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

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

    socket.on("joinRoom", async (room: string) => {
      socket.join(room);

      const foundChat = await Chat.findOne({ name: room });

      if (foundChat) {
        socket.emit("chatHistory", foundChat.messages);
      }
    });
  });
};

import type { Server } from "socket.io";
import { initLoginCookie } from "./initLoginCookie.mjs";
import { initSendMessage } from "./initSendMessage.mjs";
import { initJoinRoom } from "./initJoinRoom.mjs";

export const ioOnConnection = (io: Server) => {
  io.on("connection", async (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    const loginCookie = await initLoginCookie(socket);
    
    initSendMessage(socket, loginCookie, io);

    initJoinRoom(socket);
  });
};


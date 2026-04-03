import type { Socket } from "socket.io-client";
import type { Message } from "../models/Message";
import { createMessageHtml } from "../utils/createMessageHtml";

export const socketOnConnect = (socket: Socket) => {
  socket.on("connect", () => {
    console.log(`Socket: ${socket.connected}`);

    socket.on("newMessage", (newMessage: Message) => {
      createMessageHtml(newMessage);
      console.log(newMessage);
    });
  });
};

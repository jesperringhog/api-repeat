import { Socket } from "socket.io-client";
import type { Message } from "../models/Message";

export const initSendMessage = (socket: Socket, selectedRoom: string) => {
  const newMessage = (
    document.getElementById("messageInput") as HTMLInputElement
  ).value;

  socket.emit(
    "sendMessage",
    {
      message: newMessage,
      from: "",
      time: new Date(),
    } satisfies Message,
    selectedRoom,
  );
};

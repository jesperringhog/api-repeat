import { Socket } from "socket.io-client";
import type { Message } from "../models/Message";
import type { RoomState } from "../models/RoomState";

export const initSendMessage = (socket: Socket, state: RoomState) => {
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
    state.selectedRoom,
  );
};

import type { Socket } from "socket.io";
import cookie from "cookie";
import Chat from "../models/Chat.mjs";

export const initLoginCookie = async (socket: Socket) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  const loginCookie = cookies.login;

  if (loginCookie) {
    const chats = await Chat.find();
    const rooms = chats.map((c) => c.name);

    socket.emit("roomList", rooms);
  }
  return loginCookie;
}
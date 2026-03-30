import { io } from "socket.io-client";
import "./styles/style.scss";
import { initSendMessage } from "./utils/messageUtil";
import { socketOnConnect } from "./sockets/socketOnConnect";
import { socketOnRooms } from "./sockets/socketOnRooms";
import { socketOnChatHistory } from "./sockets/socketOnChatHistory";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

let selectedRoom = "";

socketOnConnect(socket);
socketOnRooms(socket, selectedRoom);
socketOnChatHistory(socket);

document.getElementById("messageForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initSendMessage(socket, selectedRoom);
});


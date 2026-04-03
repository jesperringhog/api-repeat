import { io } from "socket.io-client";
import "./styles/style.scss";
import { initSendMessage } from "./utils/messageUtil";
import { socketOnConnect } from "./sockets/socketOnConnect";
import { socketOnRooms } from "./sockets/socketOnRooms";
import { socketOnChatHistory } from "./sockets/socketOnChatHistory";
import { initUserStatus } from "./utils/initUserStatus";
import type { RoomState } from "./models/RoomState";

initUserStatus();

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const roomState: RoomState = { selectedRoom: ""};

socketOnConnect(socket);
socketOnRooms(socket, roomState);
socketOnChatHistory(socket);

document.getElementById("messageForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initSendMessage(socket, roomState);
});


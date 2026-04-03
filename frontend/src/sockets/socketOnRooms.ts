import type { Socket } from "socket.io-client";
import type { RoomState } from "../models/RoomState";

export const socketOnRooms = (socket: Socket, state: RoomState) => {

  socket.on("roomList", (rooms: string[]) => {
    const roomContainer = document.getElementById("roomContainer");

    if (roomContainer) {
      rooms.forEach((room) => {
        const roomBtn = document.createElement("button");
        roomBtn.textContent = room;

        roomBtn.addEventListener("click", () => {
          socket.emit("joinRoom", room);
          state.selectedRoom = room;

          document.getElementById("roomContainer")?.classList.toggle("hidden");
        });

        roomContainer.appendChild(roomBtn);
      });
    }
  });
};

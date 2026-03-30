import type { Socket } from "socket.io-client";

export const socketOnRooms = (socket: Socket, selectedRoom: string) => {
  socket.on("roomList", (rooms: string[]) => {
    const roomContainer = document.getElementById("roomContainer");

    if (roomContainer) {
      rooms.forEach((r) => {
        const roomBtn = document.createElement("button");
        roomBtn.textContent = r;

        roomBtn.addEventListener("click", () => {
          socket.emit("joinRoom", r);
          selectedRoom = r;

          document.getElementById("roomContainer")?.classList.toggle("hidden");
        });

        roomContainer.appendChild(roomBtn);
      });
    }
  });
};

import type { Socket } from "socket.io-client";

export const socketOnRooms = (socket: Socket, selectedRoom: string) => {
  socket.on("roomList", (rooms: string[]) => {
    const roomsContainer = document.getElementById("roomsContainer");

    if (roomsContainer) {
      rooms.forEach((r) => {
        const roomBtn = document.createElement("button");
        roomBtn.textContent = r;

        roomBtn.addEventListener("click", () => {
          socket.emit("joinRoom", r);
          selectedRoom = r;

          document.getElementById("roomsContainer") &&
            document
              .getElementById("chatContainer")
              ?.classList.toggle("hidden");
        });

        roomsContainer.appendChild(roomBtn);
      });
    }
  });
};

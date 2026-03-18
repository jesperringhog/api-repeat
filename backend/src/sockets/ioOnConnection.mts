import type { Server } from "socket.io";

export const ioOnConnection = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
}
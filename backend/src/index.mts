import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { config } from "dotenv";
import { ioOnConnection } from "./sockets/ioOnConnection.mjs";
import mongoose from "mongoose";
import { registerRouter } from "./routes/registerRouter.mjs";
import { loginRouter } from "./routes/loginRouter.mjs";

config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

if (!port) throw Error("PORT does not exist in .env/invalid key value");
if (!frontendUrl)
  throw Error("FRONTEND_URL does not exist in .env/invalid key value");

const app = express();
app.use(express.json());
app.use(cors({ origin: frontendUrl, credentials: true }));

const server = createServer(app);

app.use("/register", registerRouter);
app.use("/login", loginRouter);

const io = new Server(server, {
  cors: {
    origin: frontendUrl,
  },
});

ioOnConnection(io);

try {
  await mongoose.connect(mongoUri);
} catch (error) {
  console.error(error);
}

server.listen(port, async () => {
  console.log(
    `Server is running on port: ${port}, connected to database: ${mongoose.connection.name}`,
  );
});

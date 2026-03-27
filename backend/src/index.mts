import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { config } from "dotenv";
import { ioOnConnection } from "./sockets/ioOnConnection.mjs";
import mongoose from "mongoose";
import { registerRouter } from "./routes/registerRouter.mjs";
import { loginRouter } from "./routes/loginRouter.mjs";
import cookieParser from "cookie-parser";

config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const frontendUrl = process.env.FRONTEND_URL;
const jwtSecret = process.env.JWT_SECRET;

if (!port) throw Error("PORT does not exist in .env/invalid key value");
if (!mongoUri)
  throw Error("MONGO_URI does not exist in .env/invalid key value");
if (!frontendUrl)
  throw Error("FRONTEND_URL does not exist in .env/invalid key value");
if (!jwtSecret)
  throw Error("JWT_SECRET does not exist in .env/invalid key value");

const app = express();

app.use(express.json());
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/ping", (_, res) => {
  res.status(200).json({ message: "Alive" });
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    credentials: true,
  },
  cookie: true,
});

ioOnConnection(io);

server.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(error);
  }
  console.log(
    `Server is running on port: ${port}, connected to database: ${mongoose.connection.name}`,
  );
});

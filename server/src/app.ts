import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import logger from "./utils/logger";
import { version } from "../package.json";
import cors = require("cors");

import socket from "./socket";
import pool from "./utils/db";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
    methods: ["GET"]
  },
});

app.use(cors())


// API routes
app.get("/", (_, res) =>
  res.send(`Server is up and running version ${version}`)
);

// get all chats
app.get("/messages", async (req, res) => {
  try {
    const chats = await pool.query("SELECT * FROM messages");
    res.json(chats.rows);
    console.log(chats.rows);
    
  } catch (err) {
    console.error(err);
  }
});

// get chats from roomId
app.get("/messages/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const chats = await pool.query("SELECT * FROM messages WHERE room_id = $1", [roomId]);
    res.json(chats.rows);
    console.log(chats.rows);
    
  } catch (err) {
    console.error(err);
  }
});

// get all chats
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await pool.query("SELECT * FROM rooms");
    res.json(rooms.rows);
    console.log(rooms.rows);
    
  } catch (err) {
    console.error(err);
  }
});

httpServer.listen(port, host, () => {
  logger.info(`🚀 Server version ${version} is listening 🚀`);
  logger.info(`http://${host}:${port}`);

  socket({ io });
});

import { Server } from "socket.io";
import http from "http";
import { sellerSocketHandler } from "./sockets/seller.sockets";
import { customerSocketHandler } from "./sockets/customer.sockets";
import { adminSocketHandler } from "./sockets/admin.sockets";
import { configuration } from "./config";

let io: Server;

export const initSocketServer = (httpServer: http.Server) => {
  io = new Server(httpServer, {
    cors: {
      origin: configuration.allowedOrigins,
      methods: ["GET", "POST"]
    }
  });

  console.log("✅ Socket.IO initialized");

  io.on("connection", (socket) => {
    console.log(`⚡ Socket connected: ${socket.id}`);

    sellerSocketHandler(io, socket);
    customerSocketHandler(io, socket);
    adminSocketHandler(io, socket);

    socket.on("disconnect", () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

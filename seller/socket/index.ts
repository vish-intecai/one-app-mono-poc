import { Server } from "socket.io";
import { orderSocketHandler } from "./sockets/order.sockets";

let io: Server;

export const initSockets = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  console.log("Socket initialized");

  io.on("connection", socket => {
    console.log(`Socket connected: ${socket.id}`);
    console.log(`Total connected sockets: ${io.engine.clientsCount}`);
    
    orderSocketHandler(io, socket);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      console.log(`Total connected sockets: ${io.engine.clientsCount}`);
    });
  });

  io.on("error", (error) => {
    console.error("Socket.io error:", error);
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

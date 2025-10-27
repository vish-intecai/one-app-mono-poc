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
    console.log("Socket connected:", socket.id);

    orderSocketHandler(io, socket);
    
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;

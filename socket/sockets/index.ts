import { Server, Socket } from "socket.io";

import { monitorSocketHandler } from "./monitor.socket";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("client connected", socket.id);
    monitorSocketHandler(io, socket);
    
    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id);
    });
  });
};

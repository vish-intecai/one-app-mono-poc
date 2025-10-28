import { Server, Socket } from "socket.io";

export const monitorSocketHandler = (io: Server, socket: Socket) => {
  const emitClientList = () => {
    const clients = Array.from(io.sockets.sockets.values()).map(s => ({
      id: s.id,
    }));
    io.emit("clients:list", clients);
  };

  emitClientList();

  socket.on("listClients:subscribe", () => {
    emitClientList();
  });

  socket.on("disconnect", emitClientList);
};

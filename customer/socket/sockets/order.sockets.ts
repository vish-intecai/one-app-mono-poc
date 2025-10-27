import { Server, Socket } from "socket.io";

export const orderSocketHandler = (io: Server, socket: Socket) => {
  socket.on("order:create", data => {
    io.emit("order:created", data);
  });

  socket.on("order:update", data => {
    io.emit("order:updated", data);
  });
};

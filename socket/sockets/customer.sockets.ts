import { Server, Socket } from "socket.io";

export const customerSocketHandler = (io: Server, socket: Socket) => {
  socket.on("customer:join", (customerId: string) => {
    socket.join(`customer:${customerId}`);
    console.log(`🧍 Customer joined: ${customerId}`);
  });
};

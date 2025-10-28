import { Server, Socket } from "socket.io";

export const adminSocketHandler = (io: Server, socket: Socket) => {
  socket.on("admin:join", (adminId: string) => {
    socket.join(`admin:${adminId}`);
    console.log(`🛠️ Admin joined: ${adminId}`);
  });
};

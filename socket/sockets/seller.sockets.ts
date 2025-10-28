import { Server, Socket } from "socket.io";

export const sellerSocketHandler = (io: Server, socket: Socket) => {
  socket.on("seller:join", (sellerId: string) => {
    socket.join(`seller:${sellerId}`);
    console.log(`👨‍💼 Seller joined: ${sellerId}`);
  });
};

import { verifyToken } from "@/utils/jwt.util";
import { Server, Socket } from "socket.io";

export const orderSocketHandler = async (io: Server, socket: Socket) => {
  console.log('Order socket handler registered for socket:', socket.id);

  // Catch all unhandled events for debugging
  socket.onAny((eventName, ...args) => {
    console.log(`Received event "${eventName}" with data:`, JSON.stringify(args, null, 2));
  });

  // Shop joins a room
  socket.on("shop:join", async (data: any) => {
    try {
      console.log('shop:join event received with data:', JSON.stringify(data, null, 2));
      
      const { token, shopId: providedShopId } = data;
      
      if (!token) {
        console.error('No token provided');
        socket.emit("error", { message: 'Token required' });
        return;
      }

      console.log('Token received:', token);
      const decoded: any = await verifyToken(token);
      const shopId = providedShopId || decoded.id;
      const room = `shop:${shopId}`;
      
      socket.join(room);
      console.log(`Shop ${shopId} joined room: ${room}`);
      socket.emit("shop:joined", { shopId });
    } catch (error) {
      console.error('Error verifying token:', error);
      socket.emit("error", { message: 'Invalid token' });
      return;
    }
  });

  // Shop leaves a room
  socket.on("shop:leave", async ({ shopId }: { shopId: string }) => {
    const room = `shop:${shopId}`;
    socket.leave(room);
    console.log(`Shop ${shopId} left ${room}`);
  });

  // Shop acknowledges order
  socket.on("order:ack", async ({ orderId, shopId }: { orderId: string; shopId: string }) => {
    console.log(`Shop ${shopId} acknowledged order ${orderId}`);
    socket.to("admin").emit("order:acknowledged", { orderId, shopId });
  });

  // Notify connected shop about new order (for manual testing)
  socket.on("order:create", async ({ order, shopId }: { order: any; shopId: string }) => {
    const room = `shop:${shopId}`;
    io.to(room).emit("order:created", order);
    console.log(`New order sent to shop ${shopId}`);
  });

  // Update order info for that shop
  socket.on("order:update", async ({ order, shopId }: { order: any; shopId: string }) => {
    const room = `shop:${shopId}`;
    io.to(room).emit("order:updated", order);
    console.log(`Order update sent to shop ${shopId}`);
  });

  // Log all rooms the socket is currently in
  socket.on("rooms:list", () => {
    const rooms = Array.from(socket.rooms);
    console.log(`Socket ${socket.id} is in rooms:`, rooms);
    socket.emit("rooms:list", rooms);
  });
};

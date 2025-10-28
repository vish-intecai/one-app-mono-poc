import { Server, Socket } from "socket.io";
import { verifyToken } from "@/utils/jwt.util";
import { monitorSocketHandler } from "./monitor.socket";
import { ShopService } from "@/services/shop.service";

/**
 * Socket handler with JWT authentication
 *
 * Clients must provide a valid JWT token to connect.
 * Token can be provided in three ways:
 * 1. In auth object: socket.auth = { token: 'your-jwt-token' }
 * 2. In Authorization header: headers: { authorization: 'Bearer your-jwt-token' }
 * 3. In message payload: { token: 'your-jwt-token', ...otherData }
 */

export const socketHandler = (io: Server) => {
  // 🔐 Authentication + role check before connection
  io.use(async(socket, next) => {
    try {
      const token =
        socket.handshake.auth.token ||
        socket.handshake.headers.authorization?.split(" ")[1];

      if (!token) {
        return next(new Error("Authentication error: Token is required"));
      }

      const decoded: any = verifyToken(token);
      if (!decoded) {
        return next(new Error("Authentication error: Invalid token"));
      }

      console.log("Decoded : ", decoded);

      // 🧠 Role-based access check (example: seller only)
      const clientType = socket.handshake.headers.type;
      // ✅ Seller-specific validation
      if (clientType === "seller") {
        const shopId = socket.handshake.headers.shopid as string;
        if (!shopId)
          return next(new Error("Unauthorized: No shop ID provided"));

        const shop: any = await ShopService.getShopById(shopId);


        console.log(shop);
        if (!shop) return next(new Error("Unauthorized: Shop not found"));

        // Check if shop belongs to seller
        if (shop.seller.toString() !== decoded.id.toString()) {
          return next(new Error("Unauthorized: Seller doesn't own this shop"));
        }

        console.log(`✅ Seller ${decoded.id} connected to shop ${shop._id}`);
      }

      // Attach decoded user info for later use
      socket.data.user = decoded;
      socket.data.type = clientType;

      next();
    } catch (err) {
      console.error("Socket auth error:", err);
      next(new Error("Internal socket authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log(`⚡ Seller connected → ${socket.id} | User:`, socket.data.user);

    socket.use((packet, next) => {
      const [eventName, data] = packet;

      const skipAuthEvents = ["disconnect", "listClients:subscribe"];
      if (skipAuthEvents.includes(eventName)) return next();

      if (data?.token) {
        const decoded = verifyToken(data.token);
        if (!decoded) return next(new Error("Invalid token in message"));
        socket.data.user = decoded;
      }

      next();
    });

    monitorSocketHandler(io, socket);

    socket.on("disconnect", () => {
      console.log(`💤 Seller disconnected → ${socket.id}`);
    });
  });
};

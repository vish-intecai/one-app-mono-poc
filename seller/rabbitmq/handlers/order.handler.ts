import configuration from "@/config";
import { io } from "socket.io-client";

const socket = io(configuration.socketUrl as string, {
  transports: ["websocket"],
  reconnection: true,
});

export class OrderHandler {
  static async handleNewOrder(order: any) {
    try {
      console.log("New order received:", JSON.stringify(order, null, 2));

      socket.emit("order:new", order);
    } catch (error) {
      console.error("Error handling new order:", error);
    }
  }
}


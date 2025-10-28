import { getIO } from "@/socket";
import { RabbitMQConnection } from "./connection";

export const initConsumer = async () => {
  const channel = await RabbitMQConnection.connect();

  const queues = ["order.seller.created", "order.customer.updated"];
  for (const queue of queues) {
    await channel.assertQueue(queue, { durable: true });
  }

  console.log("📡 Listening for RabbitMQ messages...");

  // Listen to seller orders
  channel.consume("order.seller.created", (msg : any) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    const io = getIO();
    console.log("📩 New order for seller:", data);
    io.to(`seller:${data.sellerId}`).emit("order:created", data);
    channel.ack(msg);
  });

  // Listen to customer updates
  channel.consume("order.customer.updated", (msg : any) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    const io = getIO();
    console.log("📩 Order update for customer:", data);
    io.to(`customer:${data.customerId}`).emit("order:updated", data);
    channel.ack(msg);
  });
};

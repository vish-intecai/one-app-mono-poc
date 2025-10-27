import { RabbitMQConnection } from "../connection";

export class OrderPublisher {
  static async publishOrder(order: any) {
    try {
        const queueName = 'order.seller.created';
      const channel = await RabbitMQConnection.connect();
      await channel.assertQueue(queueName, { durable: true });
      await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(order)));
      console.log(`Order published to ${queueName} queue`);
    } catch (error) {
      console.error('Error publishing order:', error);
    }
  }
}
import { RabbitMQConnection } from '../connection';
import { OrderHandler } from '@/rabbitmq/handlers/order.handler';

export class OrderConsumer {
  static async startConsuming() {
    try {
      const channel = await RabbitMQConnection.connect();
      const channelName = 'order.seller.created';
      
      await channel.assertQueue(channelName, { durable: true });
      console.log(`Order consumer started consuming from ${channelName} queue`);
      channel.consume(channelName, async (msg: any) => {
        if (msg) {
          try {
            const order = JSON.parse(msg.content.toString());
            console.log(`Processing order from queue ${channelName}`);
            await OrderHandler.handleNewOrder(order);
            channel.ack(msg);
            console.log(`Order processed successfully`);
          } catch (error) {
            console.error('Error processing new order:', error);
            channel.nack(msg, false, true);
          }
        }
      }, { noAck: false });

      console.log(' Seller service consuming from queues');
    } catch (error) {
      console.error(' Error starting seller consumers:', error);
    }
  }
}



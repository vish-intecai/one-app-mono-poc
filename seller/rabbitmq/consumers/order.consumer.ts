import { RabbitMQConnection } from '../connection';
import { OrderHandler } from 'rabbitmq/handlers/order.handler';

export class OrderConsumer {
  static async startConsuming() {
    try {
      const channel = await RabbitMQConnection.connect();
      
      await channel.assertQueue('order.created', { durable: true });
      console.log('Order consumer started consuming from order.created queue');
      channel.consume('order.created', async (msg: any) => {
        if (msg) {
          try {
            const order = JSON.parse(msg.content.toString());
            await OrderHandler.handleNewOrder(order);
            channel.ack(msg);
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



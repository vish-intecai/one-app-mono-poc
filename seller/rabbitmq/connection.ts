// customer/rabbitmq/connection.ts
import amqp from 'amqplib';

export class RabbitMQConnection {
  private static connection: any= null;
  private static channel:any= null;

  static async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672');
      this.channel = await this.connection.createChannel();
    }
    return this.channel!;
  }
}
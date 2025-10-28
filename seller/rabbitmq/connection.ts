
import configuration from '@/config';
import amqp from 'amqplib';

export class RabbitMQConnection {
  private static connection: any= null;
  private static channel:any= null;
  
  static async connect() {
    try {
      this.connection = await amqp.connect(configuration.rabbitmqUrl);
      this.channel = await this.connection.createChannel();
      return this.channel;
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
  }
}
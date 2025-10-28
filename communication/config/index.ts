import "dotenv/config";

export const configuration  = {
  port: process.env.SOCKET_PORT || 4007,
  rabbitmqUrl: process.env.RABBITMQ_URL || "amqp://localhost",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "*").split(",")
};

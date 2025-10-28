import "dotenv/config";

export const configuration  = {
  port: process.env.SOCKET_PORT || 4007,
  mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017/",
  rabbitmqUrl: process.env.RABBITMQ_URL || "amqp://localhost",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "*").split(","),
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "3d",
    algorithm: "HS256" as const
  }
};

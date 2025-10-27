const configuration:any = {
  port: process.env.PORT || 4003,
  mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017/",
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    algorithm: "HS256"
  },
  rabbitmqUrl: process.env.RABBITMQ_URL || "amqp://localhost",
};

export default configuration;
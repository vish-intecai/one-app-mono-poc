import "dotenv/config";
import configuration from "@config/index";
import express from "express";
import cors from "cors";
import indexRouter from "@routers/index.router";
import notFoundMiddleware from "@middlewares/not-found.middleware";
import errorHandlerMiddleware from "@middlewares/error-handler.middleware";
import path from "path";
import fs from "fs";
import requestLogger from "@utils/logger.util";
import { connectDB } from "@config/db.mongodb";
import { createServer } from "http";
import { initSockets } from "./socket/index";
import { OrderConsumer } from "./rabbitmq/consumers/order.consumer";

const app = express();
const httpServer = createServer(app);
const logsPath = path.join(__dirname, "logs");

if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath);
}

app.use(requestLogger);
app.use(cors());
app.use(express.json({
  limit: "100mb"
}));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use('/api', indexRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

initSockets(httpServer);

app.listen(configuration.port, async () => {
  await connectDB();
  OrderConsumer.startConsuming();
  console.log(`Server is running on port ${configuration.port}`);
});

import express from "express";
import cors from "cors";
import http from "http";
import { initSocketServer } from "./socket";
import { initConsumer } from "./rabbitmq/consumer";
import { configuration } from "./config";

const app = express();
app.use(cors());
app.get("/", (_, res) => res.send("⚡ Socket Service Running"));

const httpServer = http.createServer(app);

initSocketServer(httpServer);

httpServer.listen(configuration.port, async () => {
  console.log(`⚡ Socket Service started on port ${configuration.port}`);
  await initConsumer();
});

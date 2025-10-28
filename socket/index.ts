import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { configuration } from "@/config";
import { socketHandler } from "./sockets";
import connectDB from "./config/db.mongodb";

const httpServer = createServer();

const io = new Server(httpServer, { cors: { origin: "*" } });

socketHandler(io);

httpServer.listen(configuration.port, async () => {
  await connectDB();
  console.log(`Socket server is running on port ${configuration.port}`);
  process.on("SIGINT", async () => {
    process.exit(0);
  });
});

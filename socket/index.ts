import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { configuration } from "@/config";
import { socketHandler } from "./sockets";

const httpServer = createServer();

const io = new Server(httpServer, { cors: { origin: "*" } });

socketHandler(io);

httpServer.listen(configuration.port, async () => {
  console.log(`Socket server is running on port ${configuration.port}`);
  process.on("SIGINT", async () => {
    process.exit(0);
  });
});

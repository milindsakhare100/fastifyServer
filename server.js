import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/connect.js";
import { registerRoutes } from "./src/routes/index.js";

// // Load environment variables
// dotenv.config();

// const fastify = Fastify({ logger: true });

// // Enable CORS
// await fastify.register(cors, { origin: '*' });

// // Sample API Route
// fastify.get('/api/message', async (request, reply) => {
//   return { message: 'Hello from Fastify (ESM)!' };
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
//   console.log(`🚀 Server running at ${address}`);
// });

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const app = Fastify({ logger: true });

  // app.register({
  //   cors: { origin: "*" },
  //   pingInterval: 2000,
  //   pingTimeout: 5000,
  //   transports: ["websocket"],
  // });

  await registerRoutes(app);


  app.listen(
    { port: process.env.PORT || 3000, host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        console.log(`err:  ${err}`);
      }
      console.log(`🚀 Server running at ${address}`);
    }
  );
  
};

start();

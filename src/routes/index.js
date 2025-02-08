import { authRoutes } from "./auth.js";

const prefix = "/api/v1";

export const registerRoutes = async (fastify, options, done) => {
  fastify.register(authRoutes, { prefix: prefix });
};

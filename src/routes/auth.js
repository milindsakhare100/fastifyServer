import {
  fetchUser,
  loginCustomer,
  refreshToken,
} from "../controllers/auth/auth.js";
import { verifyToken } from "../middlewares/auth.js";

export const authRoutes = (fastify, options, done) => {
  fastify.post("/login", loginCustomer);
  fastify.post("/refresh-token", refreshToken);

//   fastify.get("/user", { preHandler: [verifyToken] }, fetchUser);
  fastify.get("/user", fetchUser);
  done();
};

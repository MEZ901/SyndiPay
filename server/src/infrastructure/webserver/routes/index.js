import { Router } from "express";
import SwaggerDocs from "../../packages/swagger/SwaggerDocs.js";
import container from "../../../ioc-container/Container.js";
import asyncHandler from "../interceptors/asyncHandler.js";
import authRoutes from "./auth/authRoutes.js";

const routes = Router();
const swaggerDocs = new SwaggerDocs();
const authMiddleware = container.resolve("authMiddleware");

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get welcome message
 *     description: Returns a welcome message.
 *     responses:
 *       '200':
 *         description: A successful response
 */
routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

routes.use("/auth", authRoutes);

routes.use(asyncHandler(authMiddleware.authenticateUser));

swaggerDocs.setup(routes);

export default routes;

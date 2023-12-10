import { Router } from "express";
import authRoutes from "./auth/authRoutes.js";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

routes.use("/auth", authRoutes);

export default routes;

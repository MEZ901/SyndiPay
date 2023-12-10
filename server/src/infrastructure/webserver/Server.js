import express from "express";
import cookieParser from "cookie-parser";
import environment from "../config/environment.js";
import errorHandler from "./middleware/errorHandler.js";
import DependencyInjection from "../../ioc-container/DependencyInjection.js";

class Server {
  constructor() {
    this.app = express();
    this.port = environment.port;
    this.prefix = environment.prefix;
  }

  setupRoutes = async () => {
    const routes = await import("./routes/index.js");

    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.use(`/${this.prefix}`, routes.default);
  };

  configureMiddleware = () => {
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  configureErrorHandling = () => {
    this.app.use(errorHandler);
  };

  start = async () => {
    DependencyInjection.setup();
    this.configureMiddleware();
    await this.setupRoutes();
    this.configureErrorHandling();

    this.app.listen(this.port, () => {
      console.log(`-----------------------------------------------`);
      console.log(`| 🚀 Server running on http://localhost:${this.port}/ |`);
      console.log(`-----------------------------------------------`);
    });
  };
}

export default Server;

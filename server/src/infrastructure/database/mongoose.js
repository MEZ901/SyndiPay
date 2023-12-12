import mongoose from "mongoose";
import environment from "../config/environment.js";
import logger from "../packages/pino/logger.js";

mongoose.set("strictQuery", true);

mongoose.connect(environment.mongo.uri, {
  dbName: environment.mongo.dbName,
});

mongoose.connection
  .once("open", () => {
    logger.info("connection to database established successfully");
  })
  .on("error", (error) => {
    logger.error(`error while connecting to database: ${error}`);
  })
  .on("disconnected", () => {
    logger.info("database connection closed");
  });

export default mongoose;

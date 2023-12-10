import mongoose from "mongoose";
import environment from "../config/environment.js";

mongoose.set("strictQuery", true);

mongoose.connect(environment.mongo.uri, {
  dbName: environment.mongo.dbName,
});

mongoose.connection
  .once("open", () => {
    console.log("connection to database established successfully.");
  })
  .on("error", (error) => {
    console.log(`error while connecting to database: ${error}`);
  })
  .on("disconnected", () => {
    console.log("database connection closed.");
  });

export default mongoose;

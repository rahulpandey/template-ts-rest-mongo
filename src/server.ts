import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as logger from "morgan";
import * as helment from "helmet";
import * as cors from "cors";
import * as bluebird from "bluebird";

import PostRouter from "./router/PostRouter";
class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  public config() {
    const MONOG_URI =
      "mongodb://rahul:SAving43@demo-shard-00-00-hjmh5.mongodb.net:27017,demo-shard-00-01-hjmh5.mongodb.net:27017,demo-shard-00-02-hjmh5.mongodb.net:27017/test?ssl=true&replicaSet=demo-shard-0&authSource=admin";
    (<any>mongoose).Promise = global.Promise;
    // const options = { mongos: true, useMongoClient: true };

    mongoose
      .connect(MONOG_URI || process.env.MONGODB_URI, { useMongoClient: true })
      .then(() => console.log("connected to db"))
      .catch(err => console.log("Failed to connect db"));
    //mongoose.connect(MONOG_URI || process.env.MONGODB_URI);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(helment());
    this.app.use(cors());
  }

  routes() {
    let router: express.Router;
    router = express.Router();
    this.app.use("/", router);
    this.app.use("/api/v1/posts", PostRouter);
  }
}

export default new Server().app;

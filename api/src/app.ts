import express from "express";
import cors from "cors";
import dirPath from "path";
import * as routes from "./routes";


class App {
  public server: any;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(
      "/files/pdf",
      express.static(dirPath.join(__dirname, "./../", "output"))
    );
    this.server.use(
      "/files/excel",
      express.static(dirPath.join(__dirname, "./../", "output"))
    );
    this.server.use("/api/generators", routes.GeneratorRouter);
  }
}

export default new App().server;

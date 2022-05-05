import express, { Application } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@db";
import { BookRepository } from "./repositories/book_repo";
import { BookService } from "./services/book_service";
import { BookController } from "./controllers/book_controller";
import { BookRouter } from "./routers/book_route";
import morgan from "morgan";
import { handleError } from "./middlewares/error_handle";
import swaggerDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const db = new PrismaClient();

const bookRepo = new BookRepository(db);
const bookService = new BookService(bookRepo);
const bookController = new BookController(bookService);
const bookRoute = new BookRouter(bookController);
bookRoute.setRoute();

const openApiDoc = swaggerDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Api",
      version: "1.0.0",
      description: "simple library api",
    },
  },
  apis: ["./src/routers/*.ts"],
});

class App {
  public run: Application;

  constructor() {
    this.run = express();
    this.plugins();
    this.routers();
  }

  public plugins = (): void => {
    this.run.use(bodyParser.json({ limit: "50mb" }));
    this.run.use(bodyParser.urlencoded({ extended: true }));
    this.run.use(morgan("dev"));
  };

  protected routers = (): void => {
    this.run.use("/api/v1/books", bookRoute.router);
    this.run.use(
      "/api/v1/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(openApiDoc)
    );

    this.run.use(handleError);
  };
}

const app = new App().run;
const port = Number(process.env.PORT);

app.listen(port, () => console.log(`running on port ${port}`));

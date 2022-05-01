import express from "express";
import { BookController } from "../controllers/book_controller";
import { BaseRoutes } from "./base_route";

export class BookRouter extends BaseRoutes {
  private _bookController: BookController;

  constructor(bookController: BookController) {
    super();
    this._bookController = bookController;
  }

  public setRoute = (): void => {
    this.router.post("/", this._bookController.NewBook);
  };
}

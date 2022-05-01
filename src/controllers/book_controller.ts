import { Book } from "@db";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http_exception";
import { APIResponse } from "../models/response";
import { IBookService } from "../services/book_service";
import { BaseController } from "./base_controller";

export class BookController extends BaseController<APIResponse<Book>> {
  private _bookService: IBookService;

  constructor(bookService: IBookService) {
    super();
    this._bookService = bookService;
  }

  NewBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const result = await this._bookService.save(body);

      const response = this.response<Book>("ok", undefined, result);

      return this.created(response, res);
    } catch (error) {
      next(error);
    }
  };
}

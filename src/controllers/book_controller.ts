import { Book } from "@db";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http_exception";
import { APIResponse, Pagination, QueryFilterParams } from "../models/response";
import { BookFilter, IBookService } from "../services/book_service";
import { BaseController } from "./base_controller";

export class BookController extends BaseController<
  APIResponse<Book>,
  Pagination<BookFilter, Book>
> {
  private _bookService: IBookService;

  constructor(bookService: IBookService) {
    super();
    this._bookService = bookService;
  }

  newBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const result = await this._bookService.save(body);

      const response = this.response<Book>("ok", undefined, result);

      return this.created(response, res);
    } catch (error) {
      return next(error);
    }
  };

  getAllBook = async (
    req: Request<any, any, any, QueryFilterParams<BookFilter>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = new BookFilter(req.query);

      const result = await this._bookService.getAll(query);

      return this.paginateOk(result, res);
    } catch (error) {
      return next(error);
    }
  };
}

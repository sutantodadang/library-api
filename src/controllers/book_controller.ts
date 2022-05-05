import { Book } from "@db";
import { NextFunction, Request, Response } from "express";
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

  getOneBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const result = await this._bookService.getById(id);

      const response = this.response<Book>("ok", undefined, result as Book);

      return this.ok(response, res);
    } catch (error) {
      return next(error);
    }
  };

  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const body = req.body;

      const result = await this._bookService.update(id, body);

      const response = this.response("ok", undefined, result);

      return this.ok(response, res);
    } catch (error) {
      return next(error);
    }
  };
}

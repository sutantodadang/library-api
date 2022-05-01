import { Book } from "@db";
import { HttpException } from "../exceptions/http_exception";
import { IBookRepository } from "../repositories/book_repo";

export interface IBookService {
  save(book: Book): Promise<Book>;

  getAll(query: any): Promise<Book[]>;
}

export class BookService implements IBookService {
  private _bookRepo: IBookRepository;

  constructor(bookRepo: IBookRepository) {
    this._bookRepo = bookRepo;
  }

  save = async (book: Book): Promise<Book> => {
    if (book.title === null || book.description === null) {
      throw new HttpException("no book data", 400);
    }

    return this._bookRepo.create(book);
  };

  getAll = async (query: any): Promise<Book[]> => {
    const result = await this._bookRepo.findAll(query);

    if (result.length === 0) {
      throw new HttpException("no data", 400);
    }

    return result;
  };
}

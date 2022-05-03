import { Book } from "@db";
import { HttpException } from "../exceptions/http_exception";
import {
  PaginatedResponse,
  Pagination,
  QueryFilterParams,
} from "../models/response";
import { IBookRepository } from "../repositories/book_repo";

// pagination class
export class BookFilter extends PaginatedResponse<Book> {
  constructor(filter: QueryFilterParams<Book>) {
    super(filter);
  }
}

export interface IBookService {
  save(book: Book): Promise<Book>;

  getAll(query: BookFilter): Promise<Pagination<BookFilter, Book>>;
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

  getAll = async (query: BookFilter): Promise<Pagination<BookFilter, Book>> => {
    const { data, count } = await this._bookRepo.findAll(query);

    if (count === 0) {
      throw new HttpException("no data", 400);
    }

    const paginateResult: Pagination<BookFilter, Book> = {
      count_info: {
        filtered_records: data.length,
        page_count: Math.ceil(count / query.limit),
        total_record: count,
      },
      filter_info: query,
      data,
    };

    return paginateResult;
  };
}

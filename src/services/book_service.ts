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

  getById(id: string): Promise<Book | null>;

  update(id: string, data: Book): Promise<Book>;
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

    const exist = await this._bookRepo.findbyTitle(book.title);

    console.log(exist);

    if (exist?.id) {
      throw new HttpException("data already exist", 409);
    }

    book.year = Number(book.year);

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

  getById = async (id: string): Promise<Book | null> => {
    const result = await this._bookRepo.findById(id);

    if (!result) {
      throw new HttpException("no data", 400);
    }

    return result;
  };

  update = async (id: string, data: Book): Promise<Book> => {
    if (!id) {
      throw new HttpException("no id", 400);
    }

    if (!data) {
      throw new HttpException("no data to update", 400);
    }

    const exist = await this._bookRepo.findById(id);

    if (!exist) {
      throw new HttpException(`no data with id ${id}`, 400);
    }

    const result = await this._bookRepo.update(id, data);

    return result;
  };
}

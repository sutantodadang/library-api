import { Book } from "@db";
import { BaseRepository } from "./base_repo";

export interface IBookRepository {
  create(book: Book): Promise<Book>;

  findAll(param: any): Promise<Book[]>;
}

export class BookRepository extends BaseRepository implements IBookRepository {
  create = async (book: Book): Promise<Book> => {
    return await this.db.book.create({
      data: book,
    });
  };

  findAll = async (param: any): Promise<Book[]> => {
    return await this.db.book.findMany({
      where: {
        title: {
          contains: param,
        },
      },
    });
  };
}

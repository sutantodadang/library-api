import { Book } from "@db";
import { BookFilter } from "../services/book_service";
import { BaseRepository } from "./base_repo";

export interface IBookRepository {
  create(book: Book): Promise<Book>;

  findAll(param: BookFilter): Promise<{ data: Book[]; count: number }>;
}

export class BookRepository extends BaseRepository implements IBookRepository {
  create = async (book: Book): Promise<Book> => {
    return await this.db.book.create({
      data: book,
    });
  };

  findAll = async (
    param: BookFilter
  ): Promise<{ data: Book[]; count: number }> => {
    const data = await this.db.book.findMany({
      where: {
        title: {
          contains: param.search,
        },
      },
      orderBy: {
        [param.sort_col ? (param.sort_col as keyof Book) : "id"]: param.sort_dir
          ? param.sort_dir
          : "desc",
      },
      take: param.limit,
      skip: (param.page - 1) * param.limit,
    });

    const count = await this.db.book.count();

    return { data, count };
  };
}

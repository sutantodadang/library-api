import { Book } from "@db";
import { BookFilter } from "../services/book_service";
import { BaseRepository } from "./base_repo";

export interface IBookRepository {
  create(book: Book): Promise<Book>;

  findAll(param: BookFilter): Promise<{ data: Book[]; count: number }>;

  findById(id: string): Promise<Book | null>;

  findbyTitle(title: string): Promise<Book | null>;

  update(id: string, data: Book): Promise<Book>;
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
      include: {
        author: true,
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

  findById = async (id: string): Promise<Book | null> => {
    return await this.db.book.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  };

  findbyTitle = async (title: string): Promise<Book | null> => {
    return await this.db.book.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });
  };

  update = async (id: string, data: Book): Promise<Book> => {
    return await this.db.book.upsert({
      where: {
        id,
      },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
      include: {
        author: true,
      },
    });
  };
}

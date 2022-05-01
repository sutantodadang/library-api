import { PrismaClient } from "@db";

export class BaseRepository {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }
}

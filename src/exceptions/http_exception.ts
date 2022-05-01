export class HttpException extends Error {
  message: string;
  status: number;

  constructor(msg: string, status: number) {
    super();
    this.message = msg;
    this.status = status;
  }
}

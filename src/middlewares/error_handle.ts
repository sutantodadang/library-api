import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { HttpException } from "../exceptions/http_exception";

export const handleError: ErrorRequestHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const msg = err.message || "something went wrong";

  res.status(status).json({ errors: msg });
};

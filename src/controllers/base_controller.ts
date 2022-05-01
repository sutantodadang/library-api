import { Response } from "express";
import { APIResponse } from "../models/response";

export class BaseController<T> {
  response = <R>(status?: string, errors?: Error, data?: R) => {
    let result: APIResponse<R> = {
      status,
      errors,
      data,
    };

    return result;
  };

  created = (args: T, res: Response) => {
    res.status(201).json(args);
  };
}

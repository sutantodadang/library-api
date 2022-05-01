import { Router } from "express";

export abstract class BaseRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
  }
}

import { BookController } from "../controllers/book_controller";
import { BaseRoutes } from "./base_route";

export class BookRouter extends BaseRoutes {
  private _bookController: BookController;

  constructor(bookController: BookController) {
    super();
    this._bookController = bookController;
  }

  public setRoute = (): void => {
    /**
     * @openapi
     * /api/v1/books:
     *   post:
     *     tags:
     *       - Books
     *     requestBody:
     *       required: true
     *       content:
     *        application/x-www-form-urlencoded:
     *         schema:
     *          type: object
     *          properties:
     *           title:
     *            type: string
     *           description:
     *            type: string
     *           year:
     *            type: number
     *          required:
     *           - title
     *           - description
     *           - year
     *     produces:
     *       - application/json
     *     description: Create New Book
     *     responses:
     *       201:
     *         description: Created
     *       409:
     *         description: Duplicate Data
     *       500:
     *         description: Server Error
     */
    this.router.post("/", this._bookController.newBook);
    /**
     * @openapi
     * /api/v1/books:
     *   get:
     *     tags:
     *       - Books
     *     produces:
     *       - application/json
     *     description: Get All Book
     *     responses:
     *       200:
     *         description: ok
     */
    this.router.get("/", this._bookController.getAllBook);
    /**
     * @openapi
     * /api/v1/books/{id}:
     *   get:
     *     tags:
     *       - Books
     *     produces:
     *       - application/json
     *     description: Get One Book
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: ok
     *
     */
    this.router.get("/:id", this._bookController.getOneBook);
    this.router.put("/:id", this._bookController.updateBook);
  };
}

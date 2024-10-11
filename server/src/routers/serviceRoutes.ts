import express, { Router } from "express";
import ServiceController from "../controllers/serviceController";
import { body, param } from "express-validator"
import ErrorHandler from "../helper";
import Service from "../components/service";

/*
 * Represents a class that defines the routes for handling proposals.
 */
class ServiceRoutes {
  private router: Router;
  private errorHandler: ErrorHandler;
  private controller: ServiceController;


  /*
   * Constructs a new instance of the ProductRoutes class.
   */
  constructor() {
    this.router = express.Router();

    this.errorHandler = new ErrorHandler();
    this.controller = new ServiceController();
    this.initRoutes();
  }

  /*
   * Returns the router instance.
   * @returns The router instance.
   */
  getRouter(): Router {
    return this.router;
  }

  /*
   * Initializes the routes for the product router.
   *
   * @remarks
   * This method sets up the HTTP routes for handling product-related operations such as registering products, registering arrivals, selling products, retrieving products, and deleting products.
   * It can (and should!) apply authentication, authorization, and validation middlewares to protect the routes.
   *
   */
  initRoutes() {
    /**
     * Route for retrieving all services.
     * It returns an array of Service objects.
     */
    this.router.get("/", (req: any, res: any, next: any) =>
      this.controller
        .getServices()
        .then((services: any[]) => res.status(200).json(services))
        .catch((err) => {
          console.log(err);
          next(err);
        })
    );
  }
}

export default ServiceRoutes;

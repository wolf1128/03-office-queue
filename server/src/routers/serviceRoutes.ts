import express, { Router } from "express";


/* Represents a class that defines the routes for handling proposals.*/
class ServiceRoutes {
//   private controller: ServiceController;
  private router: Router;


  /* Constructs a new instance of the ProductRoutes class.*/

  constructor() {
    // this.controller = new ServiceController();
    this.router = express.Router();

    this.initRoutes();
  }

  /* Returns the router instance.* @returns The router instance.*/
  
  getRouter(): Router {
    return this.router;
  }

  /* Initializes the routes for the product router.** @remarks* This method sets up the HTTP routes for handling product-related operations such as registering products, registering arrivals, selling products, retrieving products, and deleting products. * It can (and should!) apply authentication, authorization, and validation middlewares to protect the routes.* */
  initRoutes() {
    /**
     * Route for retrieving all services.
     * It returns an array of Service objects.
     */
    // this.router.get("/", (req: any, res: any, next: any) =>
    //   this.controller
    //     .getServicess()
    //     .then((services: Service[]) => res.status(200).json(services))
    //     .catch((err) => {
    //       console.log(err);
    //       next(err);
    //     })
    // );
  }
}

export default ServiceRoutes;

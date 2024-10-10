import express, { Router } from "express";


/
 * Represents a class that defines the routes for handling users.
 */
class TicketRoutes {
  private router: Router;
  
  //   private controller: TicketController;

  /
   * Constructs a new instance of the TicketRoutes class.
   */
  constructor() {
    this.router = express.Router();

    // this.controller = new TicketController();
    this.initRoutes();
  }

  /
   * Get the router instance.
   * @returns The router instance.
   */
  getRouter(): Router {
    return this.router;
  }

  /
   * Initializes the routes for the user router.
   *
   * @remarks
   * This method sets up the HTTP routes for creating, retrieving, updating, and deleting user data.
   * It can (and should!) apply authentication, authorization, and validation middlewares to protect the routes.
   */
  initRoutes() {
    /**
     * Route for creating a ticket.
     * It returns a 200 status code.
     */
    // this.router.post(
    //   "/",
    //   body("serviceName").notEmpty().isString(),
    //   this.errorHandler.validateRequest,
    //   (req: any, res: any, next: any) =>
    //     this.controller
    //       .createTicket(req.body.serviceID)
    //       .then(() => res.status(200).end())
    //       .catch((err) => {
    //         next(err);
    //       })
    // );
  }
}

export default TicketRoutes;
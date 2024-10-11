import express, { Router } from "express";
import TicketController from "../controllers/ticketController";
import { body, param } from "express-validator"
import ErrorHandler from "../helper";
import Ticket from "../components/ticket";

/*
 * Represents a class that defines the routes for handling users.
 */
class TicketRoutes {
  private router: Router;
  private errorHandler: ErrorHandler;
  private controller: TicketController;

  /*
   * Constructs a new instance of the TicketRoutes class.
   */
  constructor() {
    this.router = express.Router();

    this.errorHandler = new ErrorHandler();
    this.controller = new TicketController();
    this.initRoutes();
  }

  /*
   * Get the router instance.
   * @returns The router instance.
   */
  getRouter(): Router {
    return this.router;
  }

  /*
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
    this.router.post(
      "/",
      body("ServiceID").notEmpty().isInt(),
      this.errorHandler.validateRequest,
      (req: any, res: any, next: any) =>
        this.controller
          .getTicket(req.body.ServiceID)
          .then((ticket: Ticket) => res.status(201).json(ticket))
          .catch((err) => {
            next(err);
          })
    );
  }
}

export default TicketRoutes;
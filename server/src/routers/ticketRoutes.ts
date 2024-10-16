import express, { Router } from "express";
import TicketController from "../controllers/ticketController";
import { body, param } from "express-validator";
import ErrorHandler from "../helper";
import Ticket from "../components/ticket";
import { Notification } from "../types/queue";

/*
 * Represents a class that defines the routes for handling tickets.
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
   * Initializes the routes for the ticket router.
   *
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

    this.router.patch(
      "/next-customer/:officerID",
      param("officerID").notEmpty().isInt({ min: 1 }),
      this.errorHandler.validateRequest,
      (req: any, res: any, next: any) =>
        this.controller
          .nextCustomer(req.params.officerID)
          .then((ticket: Ticket) => res.status(200).json(ticket))
          .catch((err) => {
            next(err);
          })
    );

    this.router.get(
      "/:ticketID/notifications",
      param("ticketID").notEmpty().isInt({ min: 1 }),
      this.errorHandler.validateRequest,
      (req: any, res: any, next: any) =>
        this.controller
          .getNotifications(req.params.ticketID)
          .then((notification: Notification) =>
            res.status(200).json(notification)
          )
          .catch((err) => {
            next(err);
          })
    );
  }
}

export default TicketRoutes;

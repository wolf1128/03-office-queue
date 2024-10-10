import express from "express"
// import ErrorHandler from "./helper"
import ServiceRoutes from "./routers/serviceRoutes"
import TicketRoutes from "./routers/ticketRoutes"

const morgan = require("morgan")
const prefix = "/api"

/* Initializes the routes for the application.* * @remarks* This function sets up the routes for the application.* It defines the routes for the user, authentication, product, and cart resources.* * @param {express.Application} app - The express application instance */
function initRoutes(app: express.Application) {
    app.use(morgan("dev")) // Log requests to the console
    app.use(express.json({ limit: "25mb" }))
    app.use(express.urlencoded({ limit: '25mb', extended: true }))

    const serviceRoutes = new ServiceRoutes()
    const ticketRoutes = new TicketRoutes()

    /* The routes for the Service, Ticket*/

    app.use(${prefix}/services, serviceRoutes.getRouter())
    app.use(${prefix}/tickets, ticketRoutes.getRouter())

    ErrorHandler.registerErrorHandler(app)
}

export default initRoutes

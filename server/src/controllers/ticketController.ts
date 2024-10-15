import { off } from "process";
import Ticket from "../components/ticket"
import TicketDAO from "../dao/ticketDAO"


class TicketController {
    private ticketDAO: TicketDAO;

    constructor() {
        this.ticketDAO = new TicketDAO();
    }

    async getTicket(service: number): Promise<Ticket | null> {
        return this.ticketDAO.getTicket(service);
    }

    async nextCustomer(officerID: number): Promise<Ticket | null> {
        return this.ticketDAO.nextCustomer(officerID);
    }

}

export default TicketController;

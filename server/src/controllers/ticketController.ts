import Ticket from "../components/ticket"
import TicketDAO from "../dao/ticketDAO"


class TicketController {
    private ticketDAO: TicketDAO;

    constructor(ticketDAO: TicketDAO) {
        this.ticketDAO = ticketDAO;
    }

    async getTicket(service: number): Promise<Ticket | null> {
        return this.ticketDAO.getTicket(service);
    }
    
}
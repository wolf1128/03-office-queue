import { Ticket } from "../components/ticket";
import TicketDAO from "../dao/ticketDAO";


class TicketController {
    private ticketDAO: TicketDAO;

    constructor(ticketDAO: TicketDAO) {
        this.ticketDAO = ticketDAO;
    }

    async nextCustomer(serviceName: string): Promise<Ticket | null> {
        return this.ticketDAO.nextCustomer(serviceName);
    }
    
}

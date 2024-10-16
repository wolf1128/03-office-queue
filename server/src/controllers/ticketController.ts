import { off } from "process";
import Ticket from "../components/ticket";
import TicketDAO from "../dao/ticketDAO";
import { Notification } from "../types/queue";

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

  async getNotifications(ticketID: number): Promise<Notification> {
    return new Promise<Notification>(async (resolve, reject) => {
      try {
        const myTicket = await this.ticketDAO.getMyTicket(ticketID);
        const nextTicket = await this.ticketDAO.getNextTicket();
        const queues = await this.ticketDAO.getQueues();

        const notification = {
          myTicket,
          displayBoard: {
            nextTicket,
            queues,
          },
        };

        resolve(notification);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default TicketController;

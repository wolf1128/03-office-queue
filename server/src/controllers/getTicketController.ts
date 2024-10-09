import { Ticket } from '../components/getTicket'

class TicketDAO {
    private ticketCounter: number = 1100; // Starting ticket ID (can be fetched from DB or initialized)

    async generateTicket(serviceID: number): Promise<Ticket> {
        try {
            const issuedTime = new Date();
            const status = 'Pending'; 

            // Auto-increment ticket ID
            const newTicketID = this.ticketCounter++; //increment 

            
            const newTicket = new Ticket(newTicketID, serviceID, issuedTime); //we will calculate waiting time from issue time

            // You would save this ticket to your database in a real-world scenario
            // Example: await db.save(newTicket);

            return newTicket;
        } catch (error) {
            console.error('Error generating ticket:', error);
            throw new Error('Failed to generate ticket');
        }
    }
}

export default TicketDAO;

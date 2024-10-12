import db from "../db/db";
import Ticket from "../components/ticket";

class TicketDAO {

    /*
        Returns the newly generated ticket.
        -DB errors
        The ticket is marked as "in queue".

        DB: table Ticket (TicketID, ServiceID, IssuedTime, EstimatedTime, Status),
            table Service (ServiceID, ServiceName, ServiceTime).

        Status can be: "in queue", "in progress", "completed".
    */
    async getTicket(service: number) {
        return new Promise<Ticket | null>((resolve, reject) => {
            try {
                const ticketID_query = "SELECT MAX(TicketID) AS pastTicket FROM Ticket";
                const insertQueue_query = "INSERT INTO Ticket VALUES(?,?,?,null,'in queue')";

                const date = new Date()
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;

                let newTicket: Ticket = new Ticket(1, service, formattedDate, 0, "in queue")

                db.get(ticketID_query, (err: Error | null, row: any) => {
                    if (err) return reject(err);
                    console.log("row.pastTicket: ", row.pastTicket)
                    if (row.pastTicket != null)
                        newTicket.ticketID = row.pastTicket + 1
                    console.log("newTicket: ", newTicket, row.pastTicket)
                    db.run(insertQueue_query, [newTicket.ticketID, newTicket.serviceID, newTicket.issuedTime], (err: Error | null) => {
                        if (err) return reject(err);
                        return resolve(newTicket);
                    });
                });

            } catch (error) {
                return reject(error);
            }
        });
    }

}


export default TicketDAO;
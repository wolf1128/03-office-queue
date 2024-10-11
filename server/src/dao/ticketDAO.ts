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

                const date = new Date
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;

                let newTicket: Ticket = { TicketID: 1, ServiceID: service, IssuedTime: formattedDate, EstimatedTime: 0, Status: "in queue" }

                db.get(ticketID_query, (err: Error | null, row: any) => {
                    if (err) return reject(err);
                    if (row.count < 1) return reject(new Error());
                    if (row != null)
                        newTicket.TicketID = row.pastTicket + 1

                    console.log(newTicket)
                    db.run(insertQueue_query, [newTicket.TicketID, newTicket.ServiceID, newTicket.IssuedTime], (err: Error | null) => {
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
import db from "../db/db";
import Ticket from "../components/ticket";

class TicketDAO {

    /*
        Returns the newly generated ticket.
        -DB errors
        The ticket is marked as "in queue".

        DB: table Ticket (TicketID, ServiceID, IssuedTime, EstimatedTime, Status, foo),
            table Service (ServiceID, ServiceName, ServiceTime).

        Status can be: "in queue", "in progress", "completed".
    */
    async getTicket(service: number) {
        return new Promise<Ticket | null>((resolve, reject) => {
            try {
                const ticketID_query = "SELECT MAX(TicketID) FROM Ticket";
                const insertQueue_query = "INSERT INTO Ticket VALUES(?,?,0,0,'in queue'";

                let newTicket:Ticket={TicketID:1,ServiceID:service,IssuedTime:new Date,EstimatedTime:0,Status:"in queue"}

                db.get(ticketID_query, (err: Error | null, row: any) => {
                    if (err) return reject(err);
                    if (row.count < 1) return reject(new Error());
                    if (row!=null)
                        newTicket.TicketID=row+1

                    db.run(insertQueue_query, [newTicket.TicketID,newTicket.ServiceID], (err: Error | null) => {
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
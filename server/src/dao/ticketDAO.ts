import db from "../db/db";
import { Ticket } from "../components/ticket";


class TicketDAO {

    /*
        Returns the next ticket (least recent based on the IssuedTime) in the queue of a given service.
        If there are no tickets in the queue of the given service, it returns null.
        The ticket is marked as "in progress".

        DB: table Queue (TicketID, ServiceID, IssuedTime, EstimatedTime, Status),
            table Service (ServiceID, ServiceName, ServiceTime).

        Status can be: "in queue", "in progress", "completed".
    */
    async nextCustomer(serviceName: string) {
        return new Promise<Ticket | null>((resolve, reject) => {
            try {
                const serviceIDsql = "SELECT ServiceID FROM Service WHERE ServiceName = ?";
                const ticketIDsql = "SELECT TicketID FROM Queue WHERE ServiceID = ? AND Status = 'in queue' ORDER BY IssuedTime ASC LIMIT 1";
                const updateStatusSql = "UPDATE Queue SET Status = 'in progress' WHERE TicketID = ?";

                db.get(serviceIDsql, [serviceName], (err: Error | null, row: any) => {
                    if (err) return reject(err);
                    if (row.count < 1) return reject(new ServiceNotFoundError());

                    db.get(ticketIDsql, [row.ServiceID], (err: Error | null, row: any) => {
                        if (err) return reject(err);
                        if (row.count < 1) return resolve(null);

                        const returnedTicket = new Ticket(row.TicketID, row.ServiceID, row.IssuedTime, row.EstimatedTime, "in progress");

                        db.run(updateStatusSql, [returnedTicket.TicketID], (err: Error | null) => {
                            if (err) return reject(err);
                            return resolve(returnedTicket);
                        });
                    });
                });

            } catch (error) {
                return reject(error);
            }
        });
    }

}


export default TicketDAO;

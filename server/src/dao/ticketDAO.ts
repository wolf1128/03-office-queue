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

                let newTicket: Ticket = new Ticket(1, service, formattedDate, 0, "in queue", 0)

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

    async nextCustomer(officerID: number) {
        return new Promise<Ticket | null>((resolve, reject) => {
            try {
                const getTicketSql = 
                    "WITH TicketQueue AS ( " +
                    "    SELECT T.ServiceID, COUNT(*) AS QueueLength " +
                    "    FROM Ticket T " +
                    "    WHERE T.Status = 'in queue' " +
                    "    GROUP BY T.ServiceID " +
                    "), NextTicket AS ( " +
                    "    SELECT T.TicketID, T.ServiceID, T.IssuedTime, T.EstimatedTime, S.ServiceTime, Q.QueueLength " +
                    "    FROM Ticket T " +
                    "    JOIN Officer O ON O.ServiceID = T.ServiceID " +
                    "    JOIN Service S ON S.ServiceID = T.ServiceID " +
                    "    JOIN TicketQueue Q ON Q.ServiceID = T.ServiceID " +
                    "    WHERE O.OfficerID = ? AND T.Status = 'in queue' " +
                    ") " +
                    "SELECT TicketID, ServiceID, IssuedTime, EstimatedTime " +
                    "FROM NextTicket " +
                    "ORDER BY QueueLength DESC, ServiceTime ASC, TicketID ASC " +
                    "LIMIT 1;"

                const updateStatusSql = "UPDATE Ticket SET Status = 'in progress', Counter = ? WHERE TicketID = ?";

                db.get(getTicketSql, [officerID], (err: Error | null, row: any) => {
                    if (err) return reject(err);
                    if (!row) return resolve(null);

                    const returnedTicket = new Ticket(row.TicketID, row.ServiceID, row.IssuedTime, row.EstimatedTime, "in progress", officerID);

                    db.run(updateStatusSql, [officerID, returnedTicket.ticketID], (err: Error | null) => {
                        if (err) return reject(err);
                        return resolve(returnedTicket);
                    });
                });

            } catch (error) {
                return reject(error);
            }
        });
    }

}


export default TicketDAO;

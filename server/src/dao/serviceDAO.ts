import db from "../db/db";
import Service from "../components/service";

class ServiceDAO {

    /*
        Returns the list of available services.
        -DB errors

        DB: table Ticket (TicketID, ServiceID, IssuedTime, EstimatedTime, Status, foo),
            table Service (ServiceID, ServiceName, ServiceTime).
    */
    async getServices() {
        return new Promise<any[] | null>((resolve, reject) => {
            try {
                const ticketID_query = "SELECT ServiceID, ServiceName FROM Service";

                db.all(ticketID_query, (err: Error | null, rows: any) => {
                    if (err) return reject(err);

                    if (rows.length<1) return reject(new Error());
                    else resolve(rows)
                });

            } catch (error) {
                return reject(error);
            }
        });
    }

}


export default ServiceDAO;
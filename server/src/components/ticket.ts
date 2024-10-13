class Ticket {
    ticketID: number
    serviceID: number
    issuedTime: string
    estimatedTime: number
    status: string

    constructor(TicketID: number, ServiceID: number, IssuedTime: string, EstimatedTime: number, Status: string) {
        this.ticketID = TicketID;
        this.serviceID = ServiceID;
        this.issuedTime = IssuedTime;
        this.estimatedTime = EstimatedTime;
        this.status = Status;
    }
}

export default Ticket

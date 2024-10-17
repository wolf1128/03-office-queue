class Ticket {
    ticketID: number
    serviceID: number
    issuedTime: string
    estimatedTime: number
    status: string
    counterID: number

    constructor(TicketID: number, ServiceID: number, IssuedTime: string, EstimatedTime: number, Status: string, CounterID: number | null) {
        this.ticketID = TicketID;
        this.serviceID = ServiceID;
        this.issuedTime = IssuedTime;
        this.estimatedTime = EstimatedTime;
        this.status = Status;
        this.counterID = CounterID;
    }
}

export default Ticket

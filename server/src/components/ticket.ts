class Ticket {
    TicketID: number
    ServiceID: number
    IssuedTime: Date
    EstimatedTime: number
    Status: string

    constructor(TicketID: number, ServiceID: number, IssuedTime: Date, EstimatedTime: number, Status: string) {
        this.TicketID = TicketID;
        this.ServiceID = ServiceID;
        this.IssuedTime = IssuedTime;
        this.EstimatedTime = EstimatedTime;
        this.Status = Status;
    }
}

export default Ticket
class Ticket {
    TicketID: number
    ServiceID: number
    IssuedTime: Date  


    constructor(TicketID: number, ServiceID: number, IssuedTime: Date) {
        this.TicketID = TicketID;
        this.ServiceID = ServiceID;
        this.IssuedTime = IssuedTime;
    
    }
}
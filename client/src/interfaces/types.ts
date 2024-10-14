// Define the Service interface
export interface Service {
    ServiceID: number;
    ServiceName: string;
  }
  
  // Define the Ticket interface
  export interface Ticket {
    ticketID: number;
    serviceID: number;
    issuedTime: string;
    estimatedTime: string;
    status: string;
  }
  
  // Define the Props interface
  export interface Props {
    services: Service[];
    ticket: Ticket;
    setTicket: React.Dispatch<React.SetStateAction<Ticket>>;
  }
  

  export interface TicketData {
    TicketID: number;
    CounterID: number;
    CounterLabel: string;
  }

  export interface WaitingQueueItem {
      ServiceID: number;
      ServiceName: string;
      noOfPeople: number;
  }

  export interface NotificationsResponse {
      data: TicketData;
      waitingQueue: WaitingQueueItem[];
  }
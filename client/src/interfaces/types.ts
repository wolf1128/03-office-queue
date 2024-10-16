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
    estimatedTime: number;
    status: string;
    counterID: number;
  }
  
  // Define the Props interface
  export interface Props {
    services: Service[];
    ticket: Ticket;
    setTicket: React.Dispatch<React.SetStateAction<Ticket>>;
  }

  export interface Queue {
    ServiceName: string;
    length: number;
  }

  export interface NotificationsResponse {
    myTicket: Ticket;
    displayBoard: {
      nextTicket: Ticket;
      queues: Queue[];
    };
  }
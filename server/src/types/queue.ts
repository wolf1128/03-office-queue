import Ticket from "../components/ticket";

export interface Queue {
  serviceName: string;
  length: number;
}

export interface Notification {
  myTicket: Ticket;
  queues: Queue[];
}

export interface Ticket {
  id: number;
  eventId: number;
  userId: number;
  ticketType: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  name: string;
  price: number;
  availableSeats: number;
  date: string;
  category: string;
  Ticket: Ticket[];
}

export interface EventGraphsProps {
  events: Event[];
}

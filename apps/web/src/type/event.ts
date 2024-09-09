export interface IEvent {
  id: number;
  name: string;
  description: string;
  price: number;
  date: string;
  time: string;
  location: string;
  availableSeats: number;
  ticketType: string;
  category: string;
  isFree: boolean;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IImage {
  id: number;
  url: string;
  eventId: number;
  createdAt: string; // Date in string format
}

export interface IEventWithImage {
  id: number;
  name: string;
  description: string;
  price: number;
  date: string; // Date in ISO string format
  time: string;
  location: string;
  availableSeats: number;
  ticketType: string;
  category: string;
  isFree: boolean;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
  image: IImage[];
}

export interface EventResponse {
  status: string;
  event: Event;
}

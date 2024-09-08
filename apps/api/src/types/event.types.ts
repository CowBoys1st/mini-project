import { EventCategory } from "@prisma/client";


export interface CreateEventRequest {
    name: string;
    description: string;
    price: number;
    date: Date;
    time: string;
    location: string;
    availableSeats: number;
    ticketType?: string;
    category: EventCategory; 
    isFree?: boolean;
    organizerId: number;
  }
  
  export interface CreateEventResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    date: Date;
    time: string;
    location: string;
    availableSeats: number;
    ticketType?: string;
    category: EventCategory;
    isFree: boolean;
    organizerId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
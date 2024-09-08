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
    organizer?: string;
    attendees: number;
    promotion: string;
    reviews: number;
    createdAt: string;
    updatedAt: string;
}

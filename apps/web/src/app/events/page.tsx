'use client';
import styles from './page.module.css'
import { getEvents } from '@/lib/event';
import { getPoints } from '@/lib/user';
import { IEvent, IEventList } from '@/type/event';
import Link from 'next/link';
import { useEffect, useState } from 'react';




const EventsPage = () => {
  const [events, setEvents] = useState<IEventList[]>([]);
  
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err: any) {
        alert(err)
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen container mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
     
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
              {/* <p className="text-gray-700 mb-2"><strong>Description:</strong> {event.description}</p> */}
              <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              {/* <p className="text-gray-700 mb-2"><strong>Time:</strong> {event.time}</p> */}
              <p className="text-gray-700 mb-2"><strong>Location:</strong> {event.location}</p>
              <p className="text-gray-700 mb-2"><strong>Price:</strong> {event.isFree ? 'Free' : `IDR ${event.price}`}</p>
              {/* <p className="text-gray-700 mb-2"><strong>Available Seats:</strong> {event.availableSeats}</p> */}
              {/* <p className="text-gray-700 mb-2"><strong>Ticket Type:</strong> {event.ticketType}</p> */}
              <p className="text-gray-700 mb-2"><strong>Category:</strong> {event.category}</p>
              {/* <p className="text-gray-700 mb-2"><strong>Free:</strong> {event.isFree ? 'Free' : `IDR ${event.price}`}</p> */}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
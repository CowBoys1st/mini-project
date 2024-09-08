'use client'
import { fetchEvents } from '@/services/eventService';
import { IEvent } from '@/type/event';
import Link from 'next/link';
import { useEffect, useState } from 'react'

const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
        try {
            const data = await fetchEvents();
            setEvents(data);
        } catch (err) {
            if (err instanceof Error)
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    getEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className="events-grid">
        {events.map(event => (
            <Link href={`/events/${event.id}`} key={event.id}>
                <div className='event-card border-blue-600 rounded-lg'>
                    <h2 className='event-title'>{event.name}</h2>
                    <p className='event-description'>{event.description}</p>
                    <p className='event-date'><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Price:</strong> {event.isFree ? "Free" : `$${event.price}`}</p>
                </div>
            </Link>
        ))}
    </div>
  );

};

export default EventList;
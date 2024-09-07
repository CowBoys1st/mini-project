'use client'
import { fetchEvents } from '@/services/eventService';
import { useEffect, useState } from 'react'

interface Event {
    id: number;
    name: string;
    date: string;
    location: string;
    description: string;
    attendees: number;
    maxAttendees: number;
    isCancelled: boolean;
    organizer: string;
    organizerEmail: string;
    organizerPhone: string;
    organizerUrl: string;
    organizerImage: string;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    categoryName: string;
    categoryIcon: string;
    categoryColor: string;
    organizerTimezone: string;
    isPublished: boolean;
    isFeatured: boolean;
    isHighlighted: boolean;
    isSponsored: boolean;
    isSticky: boolean;
    isPrivate: boolean;
    isAllDay: boolean;
    isRemindMe: boolean;
    remindMeMinutes: number;
    remindMeEmail: boolean;
    remindMeSms: boolean;
    remindMePush: boolean;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
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
    <div>
        <h2>Event List</h2>
        <ul>
            {events.map((event) => (
                <li key={event.id}>{event.name}</li>
            ))}
        </ul>
    </div>
  );

};

export default EventList;
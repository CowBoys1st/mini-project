'use client';
import { FiImage } from 'react-icons/fi'
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
        <p className='flex justify-center'>No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
              <div className='w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4'>
                  
                    <FiImage className='text-gray-400 text-6xl' />
                  
                    
                
              </div>
              <h2 className="text-2xl font-semibold mb-auto">{event.name}</h2>
              <p className="text-gray-600 flex items-center text-lg mr-2">
                {new Date(event.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="text-gray-500 flex items-center text-lg">
                {event.location}
              </p>
              <p className="text-green-800 text-2xl"> {event.isFree ? 'Free' : `IDR ${event.price.toLocaleString('id-ID').replace('Rp','')}`}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
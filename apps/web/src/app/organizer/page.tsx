'use client'

import EventGraphs from "@/components/chart";
import { getUserEvents } from "@/lib/user";
import { Event } from "@/type/chart";
import { useEffect, useState } from "react";

export default function Home() {
  const [eventData, setEventData] = useState<Event[] | null>(null); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getUserEvents(); 
        setEventData(res.events);
         
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventData([]); 
      }
    };

    fetchEvents();
  }, []); 

  return (
    <div className="container mx-auto p-4">
      {eventData ? (
        eventData.length > 0 ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-8">Event Data Visualizations</h1>
            <EventGraphs events={eventData} />
          </>
        ) : (
          <div className="text-center text-xl">No events available</div>
        )
      ) : (
        <div className="text-center text-xl">Loading events...</div>
      )}
    </div>
  );
}

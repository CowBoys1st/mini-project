'use client'

import { IEvent } from "@/type/event";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api'

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<IEvent | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`${base_url}/events/${id}`)
            .then((response) => response.json())
            .then((data: IEvent) => setEvent(data))
            .catch((error) => console.error('Error fetching event:', error))
        }
    }, [id]);

    if (!event) return <p>Loading...</p>;

    return (
        <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> {event.isFree ? "Free" : `$${event.price}`}</p>
        </div>
    )
}

export default EventDetail;
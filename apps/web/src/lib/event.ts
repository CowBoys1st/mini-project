'use client';

export const getEvents = async () => {
  const res = await fetch('http://localhost:8000/api/events');
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  return res.json();
};

export const getEventsById = async (id:string|number) => {
  const res = await fetch(`http://localhost:8000/api/events/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  return res.json();
};

'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const EventFormN = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    date: '',
    time: '',
    location: '',
    availableSeats: 0,
    ticketType: '',
    category: '',
    isFree: false,
    organizerId: 7, // ini bisa disesuaikan dengan id organizer
  });

const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
        ...formData, price: Number(formData.price), availableSeats: Number(formData.availableSeats),
    }

    try {
      const response = await fetch('http://localhost:8000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/events/${result.id}`);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-1/3 flex flex-col justify-center"
    >
      <div>
        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Available Seats</label>
        <input
          type="number"
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Ticket Type</label>
        <input
          type="text"
          name="ticketType"
          value={formData.ticketType}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        >
          <option value="MUSIC">Music</option>
          <option value="SPORTS">Sports</option>
          <option value="CONFERENCE">Conference</option>
          <option value="WORKSHOP">Workshop</option>
          <option value="FESTIVAL">Festival</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Is Free</label>
        <input
          type="checkbox"
          name="isFree"
          checked={formData.isFree}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Event
      </button>
    </form>
  );
};

export default EventFormN;

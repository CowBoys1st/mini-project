'use client'
import { useState } from "react"

const EventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        date: '',
        time: '',
        location: '',
        availableSeats: '',
        ticketType: '',
        isFree: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('api/events', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to create event');
            }
            alert('Event created successfully');
        } catch (error) {
            console.error(error);
            alert('Error creating event');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-1/3 flex flex-col justify-center ">
            <div>
                <label>Event Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="border rounded p-2 w-full" required />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="border rounded p-2 w-full" required />
            </div>
            <div>
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="border rounded p-2 w-full" disabled={formData.isFree} />
            </div>
            <div>
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="border rounded p-2 w-full" required />
            </div>
            <div>
                <label>Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} className="border rounded p-2 w-full" required />
            </div>
            <div>
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="border rounded p-2 w-full" required />
            </div>
            <div>
                <label>Available Seats</label>
                <input type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} className="border rounded p-2 w-full" required />
            </div>
            <div>
                <label>Ticket Type</label>
                <input type="text" name="ticketType" value={formData.ticketType} onChange={handleChange} className="border rounded p-2 w-full" required />
            </div>
            <div className="flex items-center">
                <label className="mr-2">Is Free</label>
                <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleCheckboxChange} className="border rounded p-2 w-full"/>
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Event</button>
        </form>
    )
}

export default EventForm;
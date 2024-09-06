import { useState } from "react"

const EventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        date: '',
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Event Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            // tambah kode lainnya
            <button type="submit">Create Event</button>
        </form>
    )
}

export default EventForm;
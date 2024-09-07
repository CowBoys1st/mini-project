export const fetchEvents = async () => {
    const response: Response = await fetch('http://localhost:8000/api/events');
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return response.json();
}
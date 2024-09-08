export const fetchEvents = async () => {
    try {
        const response: Response = await fetch('http://localhost:8000/api/events');
        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('error fetching events:', error);
        throw error;
    }
}
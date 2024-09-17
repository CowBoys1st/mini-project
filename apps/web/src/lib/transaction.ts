import { EventTransaction } from "@/type/event";

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const checkTransaction = async (eventId: number) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:8000/api/transaction/find/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data:EventTransaction | null = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



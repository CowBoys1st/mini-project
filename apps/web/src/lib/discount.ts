const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const getDiscountByUserId = async (id: number) => {
  try {
    const response = await fetch(`${base_url}/users/${id}/discount-coupons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching discount coupons: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching discount coupons:', error);
    throw error;
  }
};
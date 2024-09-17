import { deletePoints } from '@/lib/user';
import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketPrice: number;
  onSubmit: (coupon: string, usePoints: boolean) => void;
  event: any;
  points: number | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  ticketPrice,
  onSubmit,
  event,
  points,
}) => {
  const [coupon, setCoupon] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number>(ticketPrice);
  const [paymentMethod, setPaymentMethod] = useState(''); // State untuk metode pembayaran

  useEffect(() => {
    if (points && usePoints) {
      setFinalPrice(ticketPrice - points);
    }
  }, [usePoints]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please login.');
      return;
    }
  
    const bodyData = {
      eventId: event.id,
      price: finalPrice,
      discountCode: coupon,
    };
  
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/transaction/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(
          result.message || 'Error occurred while creating transaction',
        );
      }

      if (usePoints) {
        const response = await deletePoints()
        console.log(response);
      }
  
      onSubmit(coupon, usePoints);
      onClose();
      
      window.location.reload();
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{event.name}</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Ticket Price</label>
          <p>
            {finalPrice.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enter Coupon</label>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter coupon code"
          />
        </div>

        {points     && (
          <div className="mb-6">
            <div className="flex gap-2 justify-between">
              <label className="block mb-2 font-semibold">Use Points</label>
              <label>My Points: {points}</label>
            </div>
            <input
              type="radio"
              checked={usePoints}
              onChange={() => setUsePoints(!usePoints)}
            />{' '}
            Yes
          </div>
        )}

        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Payment Method</option>
          <option value="bank">Bank Transfer</option>
          <option value="paypal">PayPal</option>
          <option value="credit_card">Credit Card</option>
          <option value="gopay">GoPay</option>
        </select>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

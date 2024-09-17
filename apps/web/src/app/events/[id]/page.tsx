'use client';

import MyCoupons from '@/components/coupons';
import EventDetails from '@/components/eventDetail';
import Modal from '@/components/modals';
import { getDiscountByUserId } from '@/lib/discount';
import { AiFillCalendar, AiFillEnvironment } from 'react-icons/ai';
import { FiImage } from 'react-icons/fi';
import { getEventsById } from '@/lib/event';
import { checkTransaction } from '@/lib/transaction';
import { getPoints } from '@/lib/user';
import { EventTransaction, IEventWithImage } from '@/type/event';
import { ApiResponse, DiscountCoupon } from '@/type/user';
import { IEventWithImage } from '@/type/event';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EventsPage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<IEventWithImage | null>(null);
  const [points, setPoints] = useState<number | null>(0);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [transaction, setTransaction] = useState<EventTransaction | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resEvent = await getEventsById(+params.id);
        setEvent(resEvent.event);
      } catch (err: any) {
        alert(err);
      }
    };

    const fetchTransaction = async () => {
      try {
        const res = await checkTransaction(+params.id);
        setTransaction(res);
      } catch (error: any) {
        console.log(error);
      }
    };

    const fetchCoupons = async () => {
      try {
        const userId = +params.id;
        const data: ApiResponse = await getDiscountByUserId(userId);
        setCoupons(data.user.discountCoupons);
        console.log(data.user.discountCoupons, 'fetched');
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    const fetchPoints = async () => {
      try {
        const data = await getPoints();
        setPoints(data.points);
      } catch (err: any) {
        if (
          err.message.includes('No token found') ||
          err.message.includes('jwt expired')
        ) {
          router.push('/login');
        } else {
          alert(`Error fetching points: ${err.message}`);
        }
      }
    };

    fetchTransaction();
    fetchEvent();
    fetchPoints();
    fetchCoupons();
  }, [params.id, router]);

  const handleBuyTicket = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (coupon: string, usePoints: boolean) => {
    console.log('Coupon:', coupon);
    console.log('Use Points:', usePoints);
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/transaction/${transaction.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Payment failed');
      }

      alert('Payment successful!');
      window.location.reload(); // Refresh the page after successful payment
    } catch (error: any) {
      alert(error.message || 'An error occurred during payment');
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen container mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Event Details</h1>
      {!event ? (
        <p className="text-center">Loading event details...</p>
      ) : (
        <div>
          <EventDetails event={event} />
          <button
            onClick={handleBuyTicket}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Buy Ticket
          </button>
        </div>
      )}
      <div className="flex justify-between">
        {coupons.length === 0 ? (
          <div>Tidak ada kupon</div>
        ) : (
          <MyCoupons id={+params.id} coupons={coupons as DiscountCoupon[]} />
        )}

        <div className="points flex gap-5 items-center">
          <h1 className="text-2xl z-10">My Points:</h1>
          <p className="bg-yellow-400 text-red-500 h-fit text-3xl p-2 rounded-lg">
            {points}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticketPrice={event.price}
        onSubmit={handleModalSubmit}
        event={event}
        points={points}
      />

      {transaction && transaction.price !== undefined && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Transaction Details {transaction.id}
            </h2>
            <p className="mb-2">
              <strong>Event ID:</strong> {transaction.eventId}
            </p>
            <p className="mb-2">
              <strong>Price:</strong>{' '}
              {transaction.price?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </p>

            <button
              onClick={handlePayment}
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventsPage;

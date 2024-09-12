'use client';

// import MyCoupons from '@/components/Coupons';
import { getEventsById } from '@/lib/event';
import { getPoints } from '@/lib/user';
import { IEventWithImage } from '@/type/event';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EventsPage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<IEventWithImage | null>(null);
  const [points, setPoints] = useState<number | null>(0);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resEvent = await getEventsById(+params.id);
        setEvent(resEvent.event);
      } catch (err: any) {
        alert(err);
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

    fetchEvent();
    fetchPoints();
  }, [params.id, router]);

 if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Event Details</h1>
      {!event ? (
        <p className="text-center">Loading event details...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            {event.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {event.image.map((img) => (
              <div
                key={img.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <img
                  src={img.url}
                  alt={`Event image ${img.id}`}
                  width={500} // Adjust as needed
                  height={300} // Adjust as needed
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
          <div className="space-y-4 mb-6">
            <p className="text-gray-700 text-lg">
              <strong>Description:</strong> {event.description}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Time:</strong> {event.time}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Price:</strong>{' '}
              {event.price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Available Seats:</strong> {event.availableSeats}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Ticket Type:</strong> {event.ticketType}
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={() =>
                alert('Buy Ticket functionality not implemented yet!')
              }
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Buy Ticket
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        {/* <MyCoupons id={+params.id} /> */}

        <div className="points flex gap-5 items-center">
          <h1 className='text-2xl z-10'>My Points:</h1>
          <p className='bg-yellow-400 text-red-500 h-fit text-3xl p-2 rounded-lg'>{points}</p>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
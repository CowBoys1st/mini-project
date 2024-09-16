'use client';

// import MyCoupons from '@/components/Coupons';
import { AiFillCalendar, AiFillEnvironment } from 'react-icons/ai';
import { FiImage } from 'react-icons/fi';
import { getEventsById } from '@/lib/event';
import { getPoints } from '@/lib/user';
import { IEventWithImage } from '@/type/event';
import Image from 'next/image';
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
    <div className="p-6 bg-gray-100 min-h-screen container mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Event Details</h1>
      {!event ? (
        <p className="text-center">Loading event details...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="relative w-full h-80 mb-4 text-center">
            {/* {event.image.length > 0 ? (
              <Image
                src={event.image[0].url}
                alt={`Event image ${event.image[0].id}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md"
              />
            ) : (

            )} */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
              <FiImage className="text-gray-400 text-9xl" />
            </div>
            {/* {event.image.map((img) => (
              <div
                key={img.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <Image
                  src={img.url}
                  alt={`Event image ${img.id}`}
                  width={500}
                  height={300}
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            ))} */}
          </div>

          <h2 className=" text-3xl md:text-6xl font-semibold mb-4">
            {event.name}
          </h2>
          <div className="description space-y-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div>
                <p className="text-gray-500 flex items-center text-lg">
                  <AiFillEnvironment className="mr-2" /> {event.location}
                </p>
                <div className="flex items-center">
                  <p className="text-gray-600 flex items-center text-lg mr-2">
                    <AiFillCalendar className="mr-2" />{' '}
                    {new Date(event.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-700 text-lg">| {event.time} WIB</p>
                </div>
                <p className="text-gray-700 text-lg">
                  <strong>Available Seats:</strong> {event.availableSeats}
                </p>
                <p className="text-gray-700 text-lg">
                  <strong>Ticket Type:</strong> {event.ticketType}
                </p>
              </div>
              <div className="flex flex-row w-full md:w-auto justify-between md:flex-col items-end gap-4 md:justify-end mt-4 md:mt-0">
                <p className="text-green-800 text-4xl md:text-6xl ">
                  IDR {event.price.toLocaleString('id-ID').replace('Rp', '')}
                </p>
                <div>
                  <button
                    onClick={() =>
                      alert('Buy Ticket functionality not implemented yet!')
                    }
                    className="bg-blue-500 text-white py-2  px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 text-lg">
                <strong>Description:</strong>
              </p>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        {/* <MyCoupons id={+params.id} /> */}

        <div className="points flex gap-5 items-center">
          <h1 className="text-2xl z-10">My Points:</h1>
          <p className="bg-yellow-400 text-red-500 h-fit text-3xl p-2 rounded-lg">
            {points}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

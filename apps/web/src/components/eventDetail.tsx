import { IEventWithImage } from '@/type/event';
import Image from 'next/image';
import { AiFillCalendar, AiFillEnvironment } from 'react-icons/ai';
import { FiImage } from 'react-icons/fi';

interface EventDetailsProps {
  event: IEventWithImage;
  onClick2: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClick2 }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="relative w-full max-w-screen-lg mx-auto overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center filter blur-lg"
          style={{
            backgroundImage: `url(${event.image[0]?.url || ''})`,
          }}
        ></div>

        <div className='relative'> 
        {event.image.length > 0 ? (
          event.image.map((img) => (
            <div key={img.id} className="mx-auto p-2 max-w-full">
              <Image
                src={img.url}
                alt={`Event image ${img.id}`}
                width={500}
                height={300}
                className="object-cover rounded-lg shadow-md w-full h-auto"
              />
            </div>
          ))
        ) : (
          <div className="relative w-full h-80 mb-4 text-center">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
              <FiImage className="text-gray-400 text-9xl" />
            </div>
          </div>
        )}
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-4">{event.name}</h2>
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
                onClick={() => onClick2()}
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
  );
};

export default EventDetails;

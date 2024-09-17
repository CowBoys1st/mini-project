import { IEventWithImage } from '@/type/event';

interface EventDetailsProps {
  event: IEventWithImage;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-center">{event.name}</h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {event.image.map((img) => (
          <div key={img.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <img
              src={img.url}
              alt={`Event image ${img.id}`}
              width={500}
              height={300}
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
      
      </div>
    </div>
  );
};

export default EventDetails;

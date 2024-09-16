import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { EventGraphsProps } from '@/type/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
);



const EventGraphs: React.FC<EventGraphsProps> = ({ events }) => {
  const eventNames = events.map((event) => event.name);
  const eventPrices = events.map((event) => event.price);
  const eventSeats = events.map((event) => event.availableSeats);
  const eventAttendees = events.map((event) => event.Ticket.length);

  const eventMonths = events.map((event) => new Date(event.date).getMonth()); // Mengambil bulan
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Menghitung jumlah event per bulan
  const eventCountsPerMonth = Array(12).fill(0); // Array kosong untuk 12 bulan
  eventMonths.forEach((month) => {
    eventCountsPerMonth[month] += 1;
  });

  // Data untuk Line Chart
  const eventPerMonthData = {
    labels: months,
    datasets: [
      {
        label: 'Number of Events per Month',
        data: eventCountsPerMonth,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const priceData = {
    labels: eventNames,
    datasets: [
      {
        label: 'Event Prices (IDR)',
        data: eventPrices,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const seatsData = {
    labels: eventNames,
    datasets: [
      {
        label: 'Available Seats',
        data: eventSeats,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  const attendeesData = {
    labels: eventNames,
    datasets: [
      {
        label: 'Number of Attendees',
        data: eventAttendees,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className='flex flex-col gap-5'>
      <h2 className="text-center text-2xl font-bold mb-4">
        Event Price Bar Chart
      </h2>
      <div className="mb-8">
        <Bar data={priceData} />
      </div>


      <h2 className="text-center text-2xl font-bold mb-4">
        Attendees Bar Chart
      </h2>
      <div className="mb-8">
        <Bar data={attendeesData} />
      </div>

      <h2 className="text-center text-2xl font-bold mb-4">
        Available Seats Pie Chart
      </h2>
      <div className="mb-8 flex justify-center">
        <div className='w-1/2'>
          <Pie data={seatsData} />
        </div>
      </div>

      <h2 className="text-center text-2xl font-bold mb-4">
        Number of Events per Month
      </h2>
      <div className="mb-8">
        <Line data={eventPerMonthData} />
      </div>
    </div>
  );
};

export default EventGraphs;

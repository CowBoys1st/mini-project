'use client';
import { FiImage } from 'react-icons/fi';
import styles from './page.module.css';
import { getEvents } from '@/lib/event';
import { IEvent } from '@/type/event';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import LocationFilter from '@/components/LocationFilter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

const categories = [
  'ALL',
  'MUSIC',
  'SPORTS',
  'CONFERENCE',
  'WORKSHOP',
  'FESTIVAL',
  'THEATER',
  'OTHER',
];

const EventsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySearch = searchParams.get('search')
  const [events, setEvents] = useState<IEventList[]>([]);
  const [searchQuery, setSearchQuery] = useState(querySearch || '');
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err: any) {
        alert(err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      router.push(`?search=${debouncedSearchQuery}`)
    }

    fetchFilteredEvents()
  }, [debouncedSearchQuery]);


  const filteredEventByLocation = events.filter((event) => {
    const isLocationMatch =
      selectedLocation === 'All Locations' || event.location === selectedLocation;
    const isSearchMatch = event.name.toLowerCase().includes(searchQuery.toLowerCase())
    return isLocationMatch && isSearchMatch;
  });

  const filteredEvents = filteredEventByLocation.filter((event) => {
    return selectedCategory === 'ALL' || event.category === selectedCategory
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen container mx-auto max-w-8xl">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      <div className='flex items-center justify-between mb-6'>
        <div className='flex'>
          <SearchBar onSearch={handleSearch} />
          <div className="ml-4">
            <LocationFilter onSelectLocation={handleLocationSelect} />
          </div>
        </div>
      </div>
      

      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-4 rounded-lg font-semibold ${
              selectedCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <p className="flex justify-center">No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <FiImage className="text-gray-400 text-6xl" />
              </div>
              <h2 className="text-2xl font-semibold mb-auto">{event.name}</h2>
              <p className="text-gray-600 flex items-center text-lg mr-2">
                {new Date(event.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="text-gray-500 flex items-center text-lg">
                {event.location}
              </p>
              <p className="text-green-800 text-2xl">
                {' '}
                {event.isFree
                  ? 'Free'
                  : `IDR ${event.price.toLocaleString('id-ID').replace('Rp', '')}`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;

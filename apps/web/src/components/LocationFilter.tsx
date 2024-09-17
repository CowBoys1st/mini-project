import { useState } from 'react';

const cities = [
  'All Locations',
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Bali',
  'Yogyakarta',
  'Medan',
];

interface LocationFilterProps {
  onSelectLocation: (location: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  onSelectLocation,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    onSelectLocation(location);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex justify-center w-full rounded-xl border border-blue-500 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {selectedLocation}
          <svg
            className="ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleLocationSelect(city)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationFilter;

import { useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (searchRef.current) {
      onSearch(searchRef.current.value);
    }
  };

  return (
    <input
      ref={searchRef}
      onChange={handleChange}
      type="search"
      className="border p-2 border-gray-500 h-10 w-full max-w-[300px] rounded-md"
      placeholder="Search events"
    />
  );
};

export default SearchBar;

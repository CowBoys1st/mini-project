import { useEffect, useState } from "react";

interface SearhcBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearhcBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        }
    }, [searchTerm])

    useEffect(() => {
        if (debouncedTerm) {
            onSearch(debouncedTerm);
        }
    }, [debouncedTerm, onSearch]);

    return (
        <input type="text" placeholder="Search events" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border rounded-lg my-4 px-4 py-2 shadow-md text-gray-900" />
    )
}

export default SearchBar;
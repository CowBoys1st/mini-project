'use client'
import Link from "next/link";
import { useState } from "react";
import SlideInLogin from "./SlideInLogin";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import Image from "next/image";

export const Header = () => {


  const [isOpen, setIsOpen] = useState(false);

  const handleSlideToggle = () => {
    setIsOpen(!isOpen);
  }


  // menghilangkan tombol login
  const pathname = usePathname();

  const showAuthButtons = !(pathname === '/login' || pathname === '/register')

  //kode untuk searchbar
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term: string) => {
    console.log('search:term', term)
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Tiket Murah
        </Link>
        <div className="ml-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <ul className="flex space-x-4">
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div>
          {showAuthButtons && (
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleSlideToggle}>Log in / Sign up</button>
          )}
        </div>

        <SlideInLogin isOpen={isOpen} onClose={handleSlideToggle} />
      </nav>
    </header>
  );
};

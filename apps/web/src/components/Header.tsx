'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SlideInLogin from './SlideInLogin';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { verifyToken } from '@/lib/user';
import { User } from '@/type/user';

export const Header = () => {
  const [user, setUser] = useState<User|null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await verifyToken();
        if (data) {
          setUser(data.user);
        } else {
          console.log("No user data available");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSlideToggle = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  const showAuthButtons = !(pathname === '/login' || pathname === '/register');

  // Search bar handling
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term: string) => {
    console.log('search:term', term);
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Tiket Murah
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Authentication / User Info */}
        <div>
          {user ? (
            <Link href={`/user/${user.id}`} className="text-lg">
              Hi, {user.name}
            </Link>
          ) : (
            showAuthButtons && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-full"
                onClick={handleSlideToggle}
              >
                Log in / Sign up
              </button>
            )
          )}
        </div>

        {/* Slide-in Login Form */}
        <SlideInLogin isOpen={isOpen} onClose={handleSlideToggle} />
      </nav>
    </header>
  );
};

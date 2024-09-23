'use client';

import { getUserById, logOut } from '@/lib/user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  roleId: number; // 1 customers, 2 eventOrganizer
  referralNumber: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  referredUsers: IReferral[];
}

interface IReferral {
  id: number;
  referralNumber: string;
  userId: number;
  referredUserId: number;
  pointsGenerated: number;
  expiresAt: string;
  createdAt: string;
}

const UserData = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getUserById(userId);
        setUser(user);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchUser();
  }, [userId]);

  const handleCopy = async () => {
    if (user?.referralNumber) {
      await navigator.clipboard.writeText(user.referralNumber);
      setCopySuccess('Referral code copied!');
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const handleLogout = () => {
    logOut();
    router.push('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-100 text-gray-900 p-6">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome, {user.name}</h1>
          <Image
            src="/images/avatar.jpg"
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <div className="text-left w-full mb-4 space-y-2">
            <p className="text-md">
              <strong>User ID:</strong> {user.id}
            </p>
            <p className="text-md">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-md">
              <strong>Points:</strong> {user.referredUsers.length * 10000}
            </p>
            <p className="text-md">
              <strong>Referral Number:</strong> {user.referralNumber}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded mb-2 transition-all duration-300"
              onClick={handleCopy}
            >
              Copy Referral Number
            </button>
            {copySuccess && (
              <p className="text-sm text-green-600 mt-2">{copySuccess}</p>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-all duration-300">
              My Reviews
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-all duration-300">
              My Tickets
            </button>
            {user.roleId === 2 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => (window.location.href = '/organizer')}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-all duration-300"
                >
                  My Events
                </button>
                <Link
                  href="/create-event"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-all duration-300"
                >
                  Create Event
                </Link>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-md">No user data found</p>
      )}
    </div>
  );
};

export default UserData;

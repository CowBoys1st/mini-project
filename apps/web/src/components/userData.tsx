'use client';

import { getUserById, logOut } from '@/lib/user';
import Image from 'next/image';
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
  const router = useRouter()
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
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const handleLogout = () =>{
    logOut()
    router.push('/login')
  }

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6">
  {user ? (
    <div>
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}</h1>
        <Image
          src="/images/avatar.jpg"
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <div className="text-left w-full mb-4">
          <p className="text-lg">
            <strong>User ID:</strong> {user.id}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Points:</strong> {user.referredUsers.length * 10000}
          </p>
          <p className="text-lg">
            <strong>Referral Number:</strong> {user.referralNumber}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={handleCopy}
          >
            Copy Referral Number
          </button>
          {copySuccess && (
            <p className="text-sm text-green-300">{copySuccess}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-all duration-300">
          My Reviews
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow transition-all duration-300">
          My Tickets
        </button>
        {user.roleId === 2 && (
          <button
            onClick={() => window.location.href = '/organizer'}
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow transition-all duration-300"
          >
            My Events
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <p className="text-lg">No user data found</p>
  )}
</div>

  );
};

export default UserData;

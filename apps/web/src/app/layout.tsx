import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tiket Murah',
  description: 'Tempat beli tiket event murah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Header />
        <main className='flex-grow'>
          {children}
          <ToastContainer 
            position = "bottom-right"
            autoClose = {3000}
            closeOnClick
            draggable
          />
        </main>
        <Footer />
      </body>
    </html>
  );
}

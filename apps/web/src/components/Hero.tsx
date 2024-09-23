import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='relative bg-hero-bg bg-center bg-cover text-white min-h-screen flex flex-col justify-center items-center text-center p-8'>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            Welcome to Our Event Management Platform
        </h1>
        <p className='text-lg md:text-2xl mb-6'>
            Discover, book and manage events with ease and covenience
        </p>
        <Link href="/events" className='px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition'>
            Explore Events
        </Link>
      </div>
    </section>
  )
}

export default Hero
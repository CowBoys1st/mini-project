import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className=' bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center text-center p-8'>
        <h1 className='text-4xl sm:text-6xl font-bold mb-4'>
            Welcome to Our Event Management Platform
        </h1>
        <p className='text-lg sm:text-xl mb-8'>
            Discover, book and manage events with ease and covenience
        </p>
        <Link href="#events" className='px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition'>
            Explore Events
        </Link>
    </section>
  )
}

export default Hero
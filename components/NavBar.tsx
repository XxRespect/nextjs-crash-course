import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <header className="fixed w-full z-50 pointer-events-auto bg-black/50 backdrop-blur-sm border-b border-blue-500/20">
        <nav className='flex items-center justify-between px-8 py-4'>
            <Link href="/" className='logo flex items-center gap-2' >
                <Image  src="/icons/logo.png" className='logo' alt="logo"
                width={24} height={24} />

                <p className='font-bold text-lg'>Dev Event</p>
            </Link>
            <ul className="flex gap-8">
                <Link 
                    href="/" 
                    className='relative px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-blue-600 after:absolute after:bottom-0 after:left-3 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-[calc(100%-24px)]'
                >
                    Home
                </Link>
                <Link 
                    href="/" 
                    className='relative px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-blue-600 after:absolute after:bottom-0 after:left-3 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-[calc(100%-24px)]'
                >
                    Event
                </Link>
                <Link 
                    href="/" 
                    className='relative px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-blue-600 after:absolute after:bottom-0 after:left-3 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-[calc(100%-24px)]'
                >
                    Create Event
                </Link>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar
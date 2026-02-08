import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <header className="relative ">
        <nav>
            <Link href="/" className='logo' >
                <Image  src="/icons/logo.png" className='logo' alt="logo"
                width={24} height={24} />

                <p>Dev Event</p>
            </Link>
            <ul>
                <Link href="/" className='hover:transition-shadow hover:scale-110'>Home</Link>
                <Link href="/" className='hover:transition-shadow hover:scale-110'>Event</Link>
                <Link href="/" className='hover:transition-shadow hover:scale-110'>Create Event</Link>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar
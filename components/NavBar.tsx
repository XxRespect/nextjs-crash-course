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
                <Link href="/">Home</Link>
                <Link href="/">Event</Link>
                <Link href="/">Create Event</Link>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar
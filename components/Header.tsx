import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-5'>

        <div className="flex items-center justify-center space-x-2 mb-8 mt-8 w-1/"  >
          <Image src="/college-logo.svg" alt="School App" width={30} height={30} />
          <h1 className="text-xl font-bold">School App</h1>
        </div>

        <div>
            <ul className='flex'>
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Services</a></li>
            <li><a href="">Contact Us</a></li>
             </ul>
        </div>
    </div>
  )
}

export default Header

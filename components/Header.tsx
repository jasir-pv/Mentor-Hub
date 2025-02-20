'use client';
import { useState } from 'react';
import { FaSearch, FaSun, FaMoon, FaBell } from 'react-icons/fa';
import Image from 'next/image';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 flex  justify-between items-center shadow-md rounded-lg gap-2">
      {/* Left Section: Dashboard Info */}
      <div>
        <h1 className="text-2xl md:text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-300 text-sm md:text-xs">19 February, 2024</p>
      </div>

      {/*  Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search anything"
          className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md outline-none w-72 md:w-52"
        />
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      {/* Right Section: Icons and Profile */}
      <div className="flex items-center space-x-4">
        {/* Light/Dark Mode Toggle */}
        <button
          className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
        </button>

        {/* Notification Icon */}
        <button className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md">
          <FaBell className="text-gray-500 dark:text-gray-300" />
        </button>


     <div className="flex items-center gap-x-2">
        <Image
            src="/small.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
        />
        <div className="hidden lg:block">
            <p className="text-sm font-semibold">Jasir Ahsan Pv</p>
            <p className="text-xs text-gray-500">Sr. Lecturer</p>
        </div>
     </div>


      </div>
    </header>
  );
};

export default Header;

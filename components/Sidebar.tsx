'use client';
import { useState } from 'react';
import { FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaMoneyBill, FaTools, FaBookOpen, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import { GoSidebarExpand } from 'react-icons/go';

const Sidebar = () => {
  const [active, setActive] = useState('Dashboard');
  const [expand, setExpand] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Student Profile', icon: <FaUserGraduate /> },
    { name: 'Mentor Info', icon: <FaChalkboardTeacher /> },
    { name: 'Financial', icon: <FaMoneyBill /> },
    { name: 'Improvements', icon: <FaTools /> },
    { name: 'Course Resources', icon: <FaBookOpen /> }
  ];

  return (
    <div className={`h-screen ${expand ? 'w-72' : 'w-20'}  lg:w-72 bg-white rounded-3xl shadow-lg p-5 flex flex-col justify-between transition-all duration-200`}>
      <div>
        <div className="flex items-center justify-around space-x-2 mb-8 mt-8">
          <div className="flex items-center justify-center space-x-2">
           {expand && <Image src="/college-logo.svg" alt="School App" width={30} height={30} />}
            {expand && <h1 className="text-xl font-bold">School App</h1>}
          </div>
          <button onClick={() => setExpand(!expand)}>
            <GoSidebarExpand className='w-6 h-6 opacity-40' />
          </button>
        </div>

        <div className="space-y-4 mt-14">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg w-full transition duration-200 ${
                active === item.name ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {expand && <span>{item.name}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg w-full hover:bg-gray-100">
          <FaCog />
          {expand && <span>Settings</span>}
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg w-full hover:bg-gray-100">
          <FaSignOutAlt />
          {expand && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
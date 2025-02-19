'use client';
import { useState } from 'react';
import { FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaMoneyBill, FaTools, FaBookOpen, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';

const Sidebar = () => {
  const [active, setActive] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Student Profile', icon: <FaUserGraduate /> },
    { name: 'Mentor Info', icon: <FaChalkboardTeacher /> },
    { name: 'Financial', icon: <FaMoneyBill /> },
    { name: 'Improvements', icon: <FaTools /> },
    { name: 'Course Resources', icon: <FaBookOpen /> }
  ];

  return (
    <div className="h-full w-72 bg-white shadow-lg p-5 flex flex-col justify-between">
      <div>
        
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg w-full transition duration-200 ${
                active === item.name ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg w-full hover:bg-gray-100">
          <FaCog />
          <span>Settings</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg w-full hover:bg-gray-100">
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

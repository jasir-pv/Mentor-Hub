'use client';
import { useState } from 'react';
import { 
  FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, 
  FaMoneyBill, FaTools, FaBookOpen, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import Image from 'next/image';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';

type SidebarProps = {
  expand: boolean;
  setExpand: (expand: boolean) => void;
};

const Sidebar = ({ expand, setExpand }: SidebarProps) => {
  const [active, setActive] = useState('Dashboard');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Student Profile', icon: <FaUserGraduate /> },
    { name: 'Mentor Info', icon: <FaChalkboardTeacher /> },
    { name: 'Financial', icon: <FaMoneyBill /> },
    { name: 'Improvements', icon: <FaTools /> },
    { name: 'Course Resources', icon: <FaBookOpen /> }
  ];

  return (
    <div className={`h-screen ${expand ? 'w-72' : 'w-20'} fixed bg-white rounded-3xl shadow-lg p-5 flex flex-col justify-between transition-all duration-300 ease-in-out`}>
      {/* Logo & Expand Button */}
      <div>
        <div className={`flex items-center justify-between mb-8 mt-8 ${expand ? '' : 'flex-col-reverse gap-4 mt-1'}`}>
          <div className="flex items-center space-x-2">
            <Image 
              src="/college-logo.svg" 
              alt="School App" 
              width={expand ? 30 : 36} // Larger when collapsed
              height={expand ? 30 : 36} // Larger when collapsed
              className="transition-all duration-300 "
            />
            {expand && <h1 className="text-xl font-bold text-cyan-700">Mentor Hub</h1>}
          </div>
          <button 
            onClick={() => setExpand(!expand)} 
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {expand ? (
              <GoSidebarExpand className={`${expand ? 'w-5 h-5' : 'w-5 h-5'} opacity-40`} />
            ) : (
              <GoSidebarCollapse className={`${expand ? 'w-5 h-5' : 'w-5 h-5'} opacity-40`} />
            )}
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="space-y-4 mt-14">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center ${expand ? 'space-x-4' : 'justify-center'} px-4 py-2 rounded-lg w-full transition duration-200 ${
                active === item.name ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-500'
              }`}
            >
              <span className={`${expand ? 'text-base' : 'text-lg'}`}> {/* Larger icons when collapsed */}
                {item.icon}
              </span>
              {expand && <span className="ml-4">{item.name}</span>}

              {/* Tooltip when collapsed */}
              {!expand && hoveredItem === item.name && (
                <span className="absolute left-20 bg-gray-400 text-white text-sm px-2 py-1 rounded-md z-10">
                  {item.name}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Settings & Logout */}
      <div className="space-y-2 mb-6">
        <button className={`flex items-center ${expand ? 'space-x-2' : 'justify-center'} px-4 py-2 rounded-lg w-full hover:bg-gray-100`}>
          <span className={`${expand ? 'text-base' : 'text-xl'}`}>
            <FaCog />
          </span>
          {expand && <span>Settings</span>}
        </button>
        <button className={`flex items-center ${expand ? 'space-x-2' : 'justify-center'} px-4 py-2 rounded-lg w-full hover:bg-gray-100`}>
          <span className={`${expand ? 'text-base' : 'text-xl'}`}>
            <FaSignOutAlt />
          </span>
          {expand && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
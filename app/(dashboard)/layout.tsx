'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode, useEffect, useState } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  const [expand, setExpand] = useState(true); // Default expanded on desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On desktop (LG+), always keep expanded but allow toggle
      if (!mobile) {
        setExpand(true); // Force expanded state on desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='relative flex h-screen overflow-hidden'>
      {/* Mobile Overlay and Sidebar (SM/MD only) */}
      {isMobile && (
        <>
          {expand && (
            <div 
              className="fixed inset-0 z-20 bg-black/50"
              onClick={() => setExpand(false)}
            />
          )}
          <div className={`fixed z-30 h-full transition-transform duration-300 ease-in-out
            ${expand ? 'translate-x-0' : '-translate-x-full'} w-72
          `}>
            <Sidebar expand={true} setExpand={setExpand} />
          </div>
        </>
      )}

      {/* Desktop Sidebar (LG and up) */}
      {!isMobile && (
        <div className={` h-full ${expand ? 'w-72' : 'w-20'} transition-all duration-300
        `}>
          <Sidebar expand={expand} setExpand={setExpand} />
        </div>
      )}
       
      {/* Main content area */}
      <div className={` flex-1 flex flex-col transition-all duration-300
        ${isMobile ? 'ml-0' : 'ml-3'} h-full overflow-hidden  `}>

        <div className="sticky top-0 z-10 bg-white shadow">
          <Header expand={expand} setExpand={setExpand} isMobile={isMobile} />
        </div>


        <main className="flex-1  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
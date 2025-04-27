'use client';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Auto-expand only on large screens (lg and up)
      setExpand(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-50">
      {/* Overlay (mobile only) */}
      {expand && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setExpand(false)}
        />
      )}

      {/* Sidebar - fixed on mobile, normal on desktop */}
      <div className={`
        fixed lg:relative
        z-30
        h-full
        transition-transform duration-300 ease-in-out
        ${expand ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <Sidebar expand={expand} setExpand={setExpand} />
      </div>

      {/* Main content */}
      <div className={`
        flex-1 flex flex-col
        transition-margin duration-300 ease-in-out
        ${expand ? 'lg:ml-72' : 'lg:ml-20'}
        h-full overflow-auto
      `}>
        <Header expand={expand} setExpand={setExpand} />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
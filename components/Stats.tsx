'use client';

import { RxAvatar } from 'react-icons/rx';
import { useEffect, useState } from 'react';

interface StatsData {
    students: {
      total: number;
      active: number;
    };
    teachers: {
      total: number;
      active: number;
    };
  }

const Stats = () => {
    const [stats, setStats] = useState<StatsData>({
        students: { total: 0, active: 0 },
        teachers: { total: 0, active: 0 }
      });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='flex gap-8'>
      {/* Students */}
      <div>
        <h3 className='text-lg font-medium'>Students</h3>
        <div className='flex h-44 rounded-2xl bg-white w-64 mt-2'>
          <div className="relative flex flex-col gap-x-4 h-full">
            <div className='absolute rounded-full p-2 mt-6 ml-6 bg-orange-600'>
              <RxAvatar className='text-white w-[30px] h-[30px]'/>
            </div>
            <div className='ml-6 mt-24'>
              <p>Total Students = {stats.students.total}</p>
              <p>Active Students = {stats.students.active}</p>
            </div>
          </div>  
        </div>
      </div>

      {/* Teachers */}
      <div>
        <h3 className='text-lg font-medium'>Teachers</h3>
        <div className='flex h-44 rounded-2xl bg-white w-64 mt-2'>
          <div className="relative flex flex-col gap-x-4 h-full">
            <div className='absolute rounded-full p-2 mt-6 ml-6 bg-[#59b3ef]'>
              <RxAvatar className='text-white w-[30px] h-[30px]'/>
            </div>
            <div className='ml-6 mt-24'>
              <p>Total Teachers = {stats.teachers.total}</p>
              <p>Active Teachers = {stats.teachers.active}</p>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Stats;
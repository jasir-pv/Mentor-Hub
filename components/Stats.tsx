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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Students */}
      <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 p-3 rounded-full">
            <RxAvatar className="text-white w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold">Students</h3>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-gray-700">Total Students: <span className="font-bold">{stats.students.total}</span></p>
          <p className="text-gray-700">Active Students: <span className="font-bold">{stats.students.active}</span></p>
        </div>
      </div>

      {/* Teachers */}
      <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-[#59b3ef] p-3 rounded-full">
            <RxAvatar className="text-white w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold">Teachers</h3>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-gray-700">Total Teachers: <span className="font-bold">{stats.teachers.total}</span></p>
          <p className="text-gray-700">Active Teachers: <span className="font-bold">{stats.teachers.active}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Stats;

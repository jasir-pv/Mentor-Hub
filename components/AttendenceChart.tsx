'use client'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', present: 60, absent: 40 },
  { name: 'Tue', present: 70, absent: 50 },
  { name: 'Wed', present: 90, absent: 60 },
  { name: 'Thu', present: 50, absent: 30 },
  { name: 'Fri', present: 55, absent: 45 },
];

type Props = {}

const AttendanceChart = (props: Props) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-[700px] min-w-[300px] h-[350px]">
      {/* Title */}
      <h1 className="text-gray-700 font-semibold mb-4">Attendance</h1>

      {/* Legend manually */}
      <div className="flex items-center gap-4 text-sm mb-2">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[#f9db8f]"></span>
          <span className="text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[#b2e0f7]"></span>
          <span className="text-gray-600">Absent</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          
          <Bar dataKey="present" fill="#f9db8f" radius={[8, 8, 0, 0]} barSize={20} />
          <Bar dataKey="absent" fill="#b2e0f7" radius={[8, 8, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;

'use client'

import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { FaMale, FaFemale } from 'react-icons/fa'; // for icons, install react-icons if not already

const data = [
  {
    name: 'Boys',
    value: 1234,
    fill: '#8ac9f3', // light blue
  },
  {
    name: 'Girls',
    value: 1134,
    fill: '#f9db8f', // light yellow
  }
];

const RoundChart = () => {
  return (
    <div className="w-full flex flex-col aspect-square max-w-[300px] h-[350px] p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-center font-semibold text-gray-700 mb-4">Students</h2>    

      <div className="relative w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background
              dataKey="value"
              cornerRadius={50}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Icons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
          <div className="flex items-center">
            <FaMale className="text-blue-400 text-4xl" />
            <FaFemale className="text-yellow-400 text-4xl" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-center gap-8 mt-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#8ac9f3]"></span>
          <div className="flex flex-col">
            <span className="font-bold">{data[0].value}</span>
            <span>Boys (50%)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f9db8f]"></span>
          <div className="flex flex-col">
            <span className="font-bold">{data[1].value}</span>
            <span>Girls (45%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundChart;
